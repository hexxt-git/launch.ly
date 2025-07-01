FROM python:3.13-slim
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /usr/src/app

COPY requirement.txt .

RUN pip install --no-cache-dir -r requirement.txt


COPY ./app .

# Expose the port the app runs on
EXPOSE 8000

# Default command for the API service (this one is correct)
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]