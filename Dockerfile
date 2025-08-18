# Dockerfile at the multi-module root (same dir as root pom.xml)
FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /src

# ---- Cache deps (fast rebuilds) ----
COPY pom.xml .
COPY bytetech-invoice-api/pom.xml bytetech-invoice-api/pom.xml
COPY bytetech-invoice-app/pom.xml bytetech-invoice-app/pom.xml
# If you have the web module and need it, uncomment:
# COPY bytetech-invoice-web/pom.xml bytetech-invoice-web/pom.xml

# Pre-fetch deps for app (and its deps)
RUN mvn -B -DskipTests -pl bytetech-invoice-app -am dependency:go-offline

# ---- Build ----
COPY . .
# If your web module’s frontend plugin breaks builds, EITHER remove the app->web dependency,
# OR pass a skip flag that your plugin honors (example below). Adjust property name to your POM.
# RUN mvn -B -DskipTests -Dfrontend.skip=true -pl bytetech-invoice-app -am clean package
RUN mvn -B -DskipTests -pl bytetech-invoice-app -am clean package

FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
# Correct path (no extra "bytetech-invoice/" in it)
COPY --from=build /src/bytetech-invoice-app/target/bytetech-invoice-app-*.jar /app/app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app/app.jar"]