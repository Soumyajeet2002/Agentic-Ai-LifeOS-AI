from fastapi import FastAPI

from app.api.v1.router import api_router
from app.core.config import get_settings


settings = get_settings()

app = FastAPI(
    title="LifeOS Backend API",
    description=(
        "Backend API for LifeOS — an Agentic AI personal operating system. "
        "This API provides the foundation for users, projects, conversations, "
        "goals, tasks, memory, knowledge, agent runs, tools, approvals, "
        "integrations, and events."
    ),
    version="0.1.0",
    debug=settings.debug,
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json",
)

app.include_router(
    api_router,
    prefix=settings.api_v1_prefix,
)


@app.get(
    "/",
    tags=["System"],
    summary="API information",
    description="Returns basic information about the LifeOS Backend API.",
)
async def root() -> dict:
    return {
        "data": {
            "name": "LifeOS Backend API",
            "version": "0.1.0",
            "status": "running",
            "docs": "/docs",
            "openapi": "/openapi.json",
        }
    }