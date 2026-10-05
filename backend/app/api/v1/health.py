from datetime import datetime, timezone

from fastapi import APIRouter

router = APIRouter(
    prefix="/health",
    tags=["System"],
)


@router.get(
    "",
    summary="Health check",
    description="Checks whether the LifeOS Backend API is running.",
)
async def health_check() -> dict:
    return {
        "data": {
            "status": "ok",
            "service": "lifeos-backend",
            "timestamp": datetime.now(timezone.utc).isoformat(),
        }
    }