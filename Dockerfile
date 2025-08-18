FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /src

# --- cache POMs for all modules referenced by the root aggregator ---
COPY pom.xml .
COPY bytetech-invoice-api/pom.xml bytetech-invoice-api/pom.xml
COPY bytetech-invoice-app/pom.xml bytetech-invoice-app/pom.xml
COPY bytetech-invoice-web/pom.xml bytetech-invoice-web/pom.xml

# Pre-fetch deps (use the app pom as the entry point)
RUN mvn -B -DskipTests -f bytetech-invoice-app/pom.xml -am dependency:go-offline

# --- build ---
COPY . .
# If your web module's frontend plugin causes issues inside Docker, skip it via a property your POM honors:
# RUN mvn -B -DskipTests -Dfrontend.skip=true -f bytetech-invoice-app/pom.xml -am clean package
RUN mvn -B -DskipTests -f bytetech-invoice-app/pom.xml -am clean package

FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=build /src/bytetech-invoice-app/target/bytetech-invoice-app-*.jar /app/app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app/app.jar"]