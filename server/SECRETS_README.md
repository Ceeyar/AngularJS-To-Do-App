# Secrets Configuration

This document explains how to configure secrets for the ToDo App server.

## 🔐 Security Setup

The application uses a `secrets.json` file to store sensitive configuration data. This file is **NOT** committed to version control for security reasons.

## 📁 File Structure

- `secrets.json` - **ACTUAL SECRETS** (ignored by git)
- `secrets.template.json` - Template showing required structure
- `appsettings.json` - Public configuration (committed to git)

## 🚀 Quick Setup

1. **Copy the template:**
   ```bash
   cp secrets.template.json secrets.json
   ```

2. **Edit secrets.json with your actual values:**
   - Replace `YOUR_PASSWORD_HERE` with your SQL Server password
   - Replace `YOUR_SUPER_SECRET_JWT_KEY_HERE` with a strong JWT secret key
   - Replace `YOUR_ADMIN_PASSWORD_HERE` with your desired admin password

## 🔧 Configuration Sections

### ConnectionStrings
- **DefaultConnection**: SQL Server connection string
- **Password**: Your SQL Server SA password

### Jwt
- **Key**: Strong secret key for JWT token signing (min 32 characters)
- **Issuer**: Token issuer URL (usually your API URL)
- **Audience**: Token audience URL (usually your API URL)

### AdminCredentials
- **DefaultAdminEmail**: Email for the default admin user
- **DefaultAdminPassword**: Password for the default admin user

## 🔒 Security Best Practices

1. **Never commit secrets.json to git**
2. **Use strong, unique passwords**
3. **Generate a cryptographically secure JWT key**
4. **Use environment variables in production**
5. **Rotate secrets regularly**

## 🌍 Environment-Specific Configuration

### Development
- Use `secrets.json` for local development
- File is loaded automatically by the application

### Production
- Use environment variables or Azure Key Vault
- Never use `secrets.json` in production
- Set environment variables:
  - `ConnectionStrings__DefaultConnection`
  - `Jwt__Key`
  - `Jwt__Issuer`
  - `Jwt__Audience`
  - `AdminCredentials__DefaultAdminEmail`
  - `AdminCredentials__DefaultAdminPassword`

## 🛠️ Troubleshooting

### "JWT configuration is missing" Error
- Ensure `secrets.json` exists and contains valid JWT configuration
- Check that the file is in the correct location (server root directory)

### Database Connection Issues
- Verify SQL Server is running
- Check connection string in `secrets.json`
- Ensure password is correct

### Admin User Not Created
- Check admin credentials in `secrets.json`
- Verify email and password are properly set 