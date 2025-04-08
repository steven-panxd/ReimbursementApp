# Build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

COPY ./ ./
RUN dotnet publish -c Release -o out

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/out .

# prepare wait-for-it script
# source: https://github.com/vishnubob/wait-for-it
COPY ./scripts/wait-for-it.sh ./scripts/wait-for-it.sh
RUN chmod +x ./scripts/wait-for-it.sh


ENV ASPNETCORE_URLS=http://+:12345
EXPOSE 12345

ENTRYPOINT ["./scripts/wait-for-it.sh", "postgres:5432", "--", "dotnet", "ReimbursementApp-Backend.dll"]