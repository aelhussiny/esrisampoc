const fs = require("fs");
const path = require("path");

const defaultMapper = {
    unrest: "audio",
    terrorism: "target",
    conflict: "users",
    diplomacy: "message",
    political: "message",
    coup: "userlock",
    disaster: "trianglealert",
    threat: "point",
    war: "explosion",
    kidnap: "userlock",
};

const attackReducer = {
    Airstrike: "planelanding",
    "Arson/ Firebomb": "fire",
    Assassination: "target",
    Blockades: "construction",
    "Car bomb": "explosion",
    CBRN: "biohazard",
    "Gun (firearm)": "target",
    Grenade: "explosion",
    Hijacking: "nolocation",
    Hostage: "userlock",
    "IED / Homemade": "explosion",
    Kidnap: "userlock",
    Landmine: "explosion",
    "Letter bomb": "explosion",
    "Missile/Rocket": "rocket",
    Mortar: "planelanding",
    "Protest (demonstration)": "users",
    Riot: "users",
    "Roadside bomb": "explosion",
    "Sit-in": "users",
    Strike: "users",
    "Suicide bomber": "explosion",
    Vandalism: "spraycan",
    Capture: "userlock",
    Artillery: "telescope",
    Drone: "drone",
    "Knife/bladed weapon": "sword",
    MANPAD: "rocket",
    "Military drone": "drone",
    "Naval mine": "drone",
    RPG: "rocket",
    Robbery: "userlock",
    "Sticks/beating": "hammer",
    "Vehicle ramming": "van",
    "Active Assailant": "userlock",
};

const disasterReducer = {
    disaster_earthquake: "activity",
    disaster_explosion: "explosion",
    disaster_fires: "fire",
    disaster_floods: "wavesup",
    disaster_hurricane: "tornado",
    disaster_outage: "poweroff",
    disaster_gas: "wind",
    disaster_hazmat: "biohazard",
};

const severities = [
    {
        name: "Low",
        color: "#66FF00",
    },
    {
        name: "Moderate",
        color: "#FFCC00",
    },
    {
        name: "High",
        color: "#FF6600",
    },
];

const renderer = {
    type: "unique-value",
    field: "renderer_value",
    defaultSymbol: {
        type: "simple-marker",
        size: 10,
        color: "#999999",
        outline: {
            color: "#333333",
            width: 1,
        },
    },
    uniqueValueInfos: [],
};

const final_mapper = { ...defaultMapper, ...attackReducer, ...disasterReducer };

const uniqueIcons = new Set(Object.values(final_mapper));

uniqueIcons.forEach((icon) => {
    const outputDir = path.join(__dirname, "generated_icons");
    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

    const sourceFile = path.join(__dirname, `${icon}.svg`);
    if (!fs.existsSync(sourceFile)) {
        console.error(`Source file ${sourceFile} not found for combo ${icon}`);
        return;
    }

    let svgContent = fs.readFileSync(sourceFile, "utf8");
    severities.forEach((severity) => {
        const strokeColor =
            severities.find((s) => s.name === severity.name)?.color ||
            "#000000";
        // Replaces existing stroke attributes or adds one to the root <svg> tag
        if (svgContent.includes("stroke=")) {
            svgContent = svgContent.replace(
                /stroke="[^"]*"/g,
                `stroke="${strokeColor}"`,
            );
        } else {
            svgContent = svgContent.replace(
                "<svg",
                `<svg stroke="${strokeColor}"`,
            );
        }
        const outputFile = path.join(outputDir, `${icon}_${severity.name}.svg`);
        fs.writeFileSync(outputFile, svgContent, "utf8");
        console.log(`Generated ${outputFile}`);
        renderer.uniqueValueInfos.push({
            value: `${icon}_${severity.name}`,
            symbol: {
                type: "point-3d",
                symbolLayers: [
                    {
                        type: "icon",
                        resource: {
                            href: `./icons/events/generated_icons/${icon}_${severity.name}.svg`,
                        },
                        size: 20,
                    },
                ],
            },
        });
    });
});

console.log(JSON.stringify(renderer));
