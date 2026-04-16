const combos = [
    "humanitarian_Moderate",
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
    "humanitarian_Low",
];

const renderer = {
    type: "unique-value",
    field: "renderer_value",
    uniqueValueInfos: combos.map((combo) => {
        return {
            value: combo,
            symbol: {
                type: "point-3d",
                symbolLayers: [
                    {
                        type: "icon",
                        resource: {
                            href: `./icons/events/generated_icons/${combo}.svg`,
                        },
                        size: 20,
                    },
                ],
            },
        };
    }),
};

console.log(JSON.stringify(renderer));
