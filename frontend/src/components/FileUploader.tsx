"use client";

import { useRef, useState } from "react";

interface Props {
  onExtracted: (text: string) => void;
  disabled?: boolean;
}

const MAX_BYTES = 5 * 1024 * 1024; // 5 MB
const MIN_CHARS = 30;

async function extractPdf(file: File): Promise<string> {
  const pdfjs = await import("pdfjs-dist");

  // Use unpkg with the exact installed version — most reliable.
  pdfjs.GlobalWorkerOptions.workerSrc =
    `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

  const buffer = await file.arrayBuffer();
  const pdf = await pdfjs.getDocument({ data: buffer }).promise;

  console.log(`[pdf] loaded, pages=${pdf.numPages}`);

  const pages: string[] = [];
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const text = content.items
      .map((item: any) => ("str" in item ? item.str : ""))
      .join(" ");
    console.log(`[pdf] page ${i}: ${text.length} chars`);
    pages.push(text);
  }

  const full = pages.join("\n\n");
  console.log(`[pdf] total extracted: ${full.length} chars`);
  return full;
}

async function extractDocx(file: File): Promise<string> {
  const mammoth = await import("mammoth");
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  console.log(`[docx] extracted ${result.value.length} chars`);
  return result.value;
}

async function extractTxt(file: File): Promise<string> {
  const text = await file.text();
  console.log(`[txt] read ${text.length} chars`);
  return text;
}

export default function FileUploader({ onExtracted, disabled }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [parsing, setParsing] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(file: File) {
    setError(null);
    setFileName(file.name);
    console.log(`[upload] file=${file.name} size=${file.size} type=${file.type}`);

    if (file.size > MAX_BYTES) {
      setError("File too large. Max 5 MB.");
      return;
    }

    const ext = file.name.split(".").pop()?.toLowerCase();
    setParsing(true);

    try {
      let text = "";
      if (ext === "pdf") text = await extractPdf(file);
      else if (ext === "docx") text = await extractDocx(file);
      else if (ext === "txt") text = await extractTxt(file);
      else {
        setError("Unsupported file type. Use PDF, DOCX, or TXT.");
        setParsing(false);
        return;
      }

      const cleaned = text.replace(/\s+/g, " ").trim();
      console.log(`[upload] cleaned length=${cleaned.length}`);

      if (cleaned.length < MIN_CHARS) {
        setError(
          "This file didn't contain enough readable text. " +
            "If it's a scanned PDF (a photo of a document), " +
            "please switch to Paste mode or use a text-based PDF/DOCX.",
        );
        onExtracted("");
      } else {
        onExtracted(cleaned.slice(0, 20000));
      }
    } catch (e: any) {
      console.error("[upload] parse error:", e);
      const msg =
        e?.name === "PasswordException"
          ? "This PDF is password-protected. Remove the password and try again."
          : e?.name === "InvalidPDFException"
            ? "This PDF appears to be corrupted."
            : "Failed to parse file. Try another format or switch to Paste mode.";
      setError(msg);
    } finally {
      setParsing(false);
    }
  }

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    if (disabled) return;
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  }

  return (
    <div>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          if (!disabled) setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        onClick={() => !disabled && inputRef.current?.click()}
        className={`relative w-full px-4 py-8 rounded-lg border-2 border-dashed cursor-pointer transition text-center ${
          dragging
            ? "border-blue-500 bg-blue-950/40"
            : "border-slate-600 bg-slate-900 hover:border-slate-500"
        } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.docx,.txt"
          onChange={onInputChange}
          disabled={disabled || parsing}
          className="hidden"
        />

        {parsing ? (
          <div className="flex items-center justify-center gap-3 text-slate-300">
            <div className="w-5 h-5 border-2 border-slate-500 border-t-blue-400 rounded-full animate-spin" />
            <span className="text-sm">Reading your CV...</span>
          </div>
        ) : fileName ? (
          <div className="flex items-center justify-center gap-2 text-slate-300">
            <span className="text-lg">📄</span>
            <span className="text-sm font-medium truncate max-w-[200px]">
              {fileName}
            </span>
            <span className="text-xs text-green-400">✓</span>
          </div>
        ) : (
          <>
            <div className="text-3xl mb-2">📎</div>
            <div className="text-sm text-slate-300">
              Drop your CV here or{" "}
              <span className="text-blue-400 underline">click to browse</span>
            </div>
            <div className="text-xs text-slate-500 mt-1">
              PDF, DOCX, or TXT · max 5 MB
            </div>
          </>
        )}
      </div>

      {error && (
        <div className="mt-2 text-xs text-red-400 bg-red-950/40 border border-red-900 rounded px-3 py-2 leading-relaxed">
          {error}
        </div>
      )}
    </div>
  );
}