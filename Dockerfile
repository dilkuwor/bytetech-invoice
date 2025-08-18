# Dockerfile at repo root: .../bytetech-invoice/
FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /src
COPY . .
# build only what's needed (and its deps)
RUN mvn -B -DskipTests -pl bytetech-invoice-app -am clean package

FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
# ✅ correct path to the app module target
COPY --from=build /src/bytetech-invoice-app/target/bytetech-invoice-app-*.jar /app/app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app/app.jar"]