#!/bin/bash

# VZW De Speelkamer - Production CMS Setup Script
# This script helps you configure the production CMS URL

echo "🚀 VZW De Speelkamer - Production CMS Setup"
echo "============================================"
echo ""

# Check if running in correct directory
if [ ! -f "js/data.js" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

echo "📝 This script will help you configure your production CMS."
echo ""
echo "First, deploy your CMS to Railway, Heroku, or Render."
echo "See GITHUB-CMS-SETUP.md for detailed instructions."
echo ""

# Ask for CMS URL
read -p "Enter your production CMS URL (e.g., https://vzw-cms.up.railway.app): " CMS_URL

# Remove trailing slash if present
CMS_URL=$(echo "$CMS_URL" | sed 's:/*$::')

# Validate URL
if [[ ! $CMS_URL =~ ^https?:// ]]; then
    echo "❌ Error: URL must start with http:// or https://"
    exit 1
fi

echo ""
echo "🔧 Updating js/data.js..."

# Update PRODUCTION_CMS_URL in js/data.js
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    sed -i '' "s|const PRODUCTION_CMS_URL = null;|const PRODUCTION_CMS_URL = '${CMS_URL}/api';|" js/data.js
else
    # Linux
    sed -i "s|const PRODUCTION_CMS_URL = null;|const PRODUCTION_CMS_URL = '${CMS_URL}/api';|" js/data.js
fi

echo "✅ Updated js/data.js"
echo ""

# Ask for GitHub Pages URL
read -p "Enter your GitHub Pages URL (e.g., https://leelars.github.io): " GITHUB_URL

# Remove trailing slash
GITHUB_URL=$(echo "$GITHUB_URL" | sed 's:/*$::')

echo ""
echo "🔧 Updating cms/server.js CORS configuration..."

# Update CORS in cms/server.js
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    sed -i '' "s|app.use(cors());|app.use(cors({\n    origin: '${GITHUB_URL}',\n    credentials: true\n}));|" cms/server.js
else
    # Linux
    sed -i "s|app.use(cors());|app.use(cors({\n    origin: '${GITHUB_URL}',\n    credentials: true\n}));|" cms/server.js
fi

echo "✅ Updated cms/server.js"
echo ""

echo "📋 Summary:"
echo "  - Production CMS URL: ${CMS_URL}/api"
echo "  - GitHub Pages URL: ${GITHUB_URL}"
echo ""

echo "📝 Next steps:"
echo "  1. Review the changes in js/data.js and cms/server.js"
echo "  2. Commit and push to GitHub:"
echo "     git add ."
echo "     git commit -m 'Configure production CMS'"
echo "     git push origin main"
echo ""
echo "  3. If using Railway/Render, it will auto-deploy"
echo "  4. If using Heroku, run: cd cms && git push heroku main"
echo ""
echo "  5. Test your website at: ${GITHUB_URL}"
echo ""

echo "✅ Configuration complete!"
echo ""
echo "💡 Tip: Check browser console (F12) to see if CMS data loads"
echo "    Look for: '✅ Activities loaded from CMS'"
