FROM python:3-slim
WORKDIR /app
ARG SERVICE=steam_db_handler

COPY common/requirements.txt ./common_requirements.txt
COPY ${SERVICE}/requirements.txt ./main_requirements.txt
RUN pip install --no-cache-dir -r common_requirements.txt -r main_requirements.txt

COPY common ./common
COPY ${SERVICE} ./main
CMD ["python", "-u", "-m", "main.app"]
