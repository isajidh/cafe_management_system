FROM mcr.microsoft.com/dotnet/aspnet:8.0-alpine AS base
WORKDIR /app
EXPOSE 80

ENV ASPNETCORE_URLS=http://+:80

# Install ICU library
RUN apk add --no-cache icu-libs

# Set environment variable for invariant globalization
ENV DOTNET_SYSTEM_GLOBALIZATION_INVARIANT=1

FROM --platform=$BUILDPLATFORM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG configuration=Release
WORKDIR /src
COPY ["CafeEmployeeManager.API.csproj", "./"]
RUN dotnet restore "CafeEmployeeManager.API.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "CafeEmployeeManager.API.csproj" -c $configuration -o /app/build

FROM build AS publish
ARG configuration=Release
RUN dotnet publish "CafeEmployeeManager.API.csproj" -c $configuration -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "CafeEmployeeManager.API.dll"]
