FROM python:3-slim
WORKDIR /app
ARG SERVICE=web

COPY common/requirements.txt ./common_requirements.txt
COPY ${SERVICE}/requirements.txt ./main_requirements.txt
RUN pip install --no-cache-dir -r common_requirements.txt -r main_requirements.txt

COPY common ./common
COPY ${SERVICE} ./${SERVICE}

ENV SERVICE=${SERVICE}
CMD ["uvicorn", "web.app:app", "--host", "0.0.0.0", "--port", "80"]
