import hashlib
import json
import sqlite3
import time

DB = "cache.db"
TTL_SECONDS = 86400  # 24 hours


def _init() -> None:
    with sqlite3.connect(DB) as c:
        c.execute(
            "CREATE TABLE IF NOT EXISTS cache "
            "(key TEXT PRIMARY KEY, value TEXT, ts REAL)"
        )


def key_for(resume: str, role: str) -> str:
    return hashlib.sha256(f"{resume}|{role}".encode("utf-8")).hexdigest()


def get(k: str, ttl: int = TTL_SECONDS):
    with sqlite3.connect(DB) as c:
        row = c.execute(
            "SELECT value, ts FROM cache WHERE key=?", (k,)
        ).fetchone()
    if row and (time.time() - row[1]) < ttl:
        return json.loads(row[0])
    return None


def put(k: str, v) -> None:
    with sqlite3.connect(DB) as c:
        c.execute(
            "REPLACE INTO cache VALUES (?, ?, ?)",
            (k, json.dumps(v), time.time()),
        )


_init()