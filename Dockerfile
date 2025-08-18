# Dockerfile at repo root
FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /src

# Cache dependencies first
COPY pom.xml .
COPY bytetech-invoice/pom.xml bytetech-invoice/pom.xml
COPY bytetech-invoice-api/pom.xml bytetech-invoice-api/pom.xml
COPY bytetech-invoice-app/pom.xml bytetech-invoice-app/pom.xml
RUN mvn -B -DskipTests -pl bytetech-invoice-app -am dependency:go-offline

# Then copy sources and build
COPY . .
RUN mvn -B -DskipTests -pl bytetech-invoice-app -am clean package

FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=build /src/bytetech-invoice-app/target/bytetech-invoice-app-*.jar /app/app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app/app.jar"]