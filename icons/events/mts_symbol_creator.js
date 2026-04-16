const fs = require('fs');
const path = require('path');

const combos = ["humanitarian_Moderate",
    "political_Moderate",
    "political_Elevated",
    "airstrike_Elevated",
    "political_Low",
    "conflict_Moderate",
    "conflict_Elevated",
    "buildingcollapse_Moderate",
    "debrisfalling, fire_Elevated",
    "fire_Elevated",
    "humanitarian_Elevated",
    "missilesreceived_Elevated",
    "economic_Moderate",
    "economic_Elevated",
    "missilesreceived_Moderate",
    "airstrike_Moderate",
    "fire_Moderate",
    "disaster_Elevated",
    "disaster_Moderate",
    "buildingcollapse_Elevated",
    "airstrike_Low",
    "humanitarian_Low"];

    const fileMapping = {
    "debrisfalling": "debrisfalling.svg",
    "fire": "fire.svg",
    "missilesreceived": "explosion.svg",
    "buildingcollapse": "building.svg",
    "airstrike": "planelanding.svg"
};

const categoryColors = {
    "conflict": "#ef4444",
    "political": "#8b5cf6",
    "humanitarian": "#14b8a6",
    "economic": "#23c05d",
    "disaster": "#f59e0b"
};

const severityColors = {
    "Low": "#22c55e",
    "Moderate": "#84cc16",
    "Elevated": "#f59e0b",
    "High": "#f97316",
    "Extreme": "#ef4444"
};

async function generateIcons() {
    const outputDir = path.join(__dirname, 'generated_icons');
    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

    combos.forEach(combo => {
        // Split by underscore. Handle cases like "debrisfalling, fire" by taking the first item
        const [rawType, severity] = combo.split('_');
        const primaryType = rawType.split(',')[0].trim();
        
        const isCustomIcon = fileMapping[primaryType];
        const sourceFile = isCustomIcon ? fileMapping[primaryType] : 'circle.svg';
        
        if (!fs.existsSync(sourceFile)) {
            console.error(`Source file ${sourceFile} not found for combo ${combo}`);
            return;
        }

        let svgContent = fs.readFileSync(sourceFile, 'utf8');

        // 1. Handle Stroke (Severity) for all files
        const strokeColor = severityColors[severity] || "#000000";
        // Replaces existing stroke attributes or adds one to the root <svg> tag
        if (svgContent.includes('stroke=')) {
            svgContent = svgContent.replace(/stroke="[^"]*"/g, `stroke="${strokeColor}"`);
        } else {
            svgContent = svgContent.replace('<svg', `<svg stroke="${strokeColor}"`);
        }

        // 2. Handle Fill/Outline Logic
        if (!isCustomIcon) {
            // It's a circle.svg source - set the Fill based on category
            const fillColor = categoryColors[primaryType] || "#cccccc";
            if (svgContent.includes('fill=')) {
                svgContent = svgContent.replace(/fill="[^"]*"/g, `fill="${fillColor}"`);
            } else {
                svgContent = svgContent.replace('<svg', `<svg fill="${fillColor}"`);
            }
        } else {
            // It's a specific icon - your prompt cut off the outline color instruction, 
            // but standard practice is to apply the severity color to the paths as well.
            // This replaces all path fills with the stroke/severity color for a themed icon.
            svgContent = svgContent.replace(/fill="[^"]*"/g, `fill="${strokeColor}"`);
        }

        const fileName = `${combo.replace(/, /g, '_')}.svg`;
        fs.writeFileSync(path.join(outputDir, fileName), svgContent);
        console.log(`Generated: ${fileName}`);
    });
}

generateIcons();