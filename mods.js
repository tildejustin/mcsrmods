/**
 * Mod Loader[loader] naming
 * optifine       = Optifine
 * fabric         = Fabric Loader
 * legacy-fabric  = Legacy Fabric Loader
 * 
 * Version[version] naming
 * (*)         = All versions
 * (1.16)      = 1.16 only
 * (1.15+)     = 1.15 and above
 * (~1.12)     = 1.12 and below
 * (1.7-1.12)  = From 1.7 to 1.12
 * (1.15,1.16) = 1.15 and 1.16
 */


const ALLOW_MODS = [
    {
        "name": "Fabric Loader",
        "description": "You can use Fabric Loader, but DO NOT USE Fabric API!",
        "loader": ["fabric"],
        "version": "1.14+",
        "downloads": [
            {
                "version": "1.14+",
                "url": "https://fabricmc.net/use/installer/"
            }
        ],
        "advanced": [],
        "incompatible": []
    },
    {
        "name": "Legacy Fabric Loader",
        "description": "You can use Fabric Loader, but DO NOT USE Fabric API! (Fabric for pre-1.14)",
        "loader": ["legacy-fabric"],
        "version": "~1.13",
        "downloads": [
            {
                "version": "~1.13",
                "summary": "Direct",
                "url": "https://jitpack.io/com/github/Legacy-Fabric/fabric-installer/-SNAPSHOT/fabric-installer--SNAPSHOT.jar"
            }
        ],
        "advanced": [
            {
                "version": "~1.13",
                "summary": "for MultiMC",
                "url": "https://jitpack.io/com/github/Legacy-Fabric/fabric-installer/-SNAPSHOT/fabric-installer--SNAPSHOT.jar"
            }
        ],
        "incompatible": []
    },
    {
        "name": "Optifine",
        "description": "Check the Optifine rules",
        "loader": ["optifine"],
        "version": "~1.14",
        "downloads": [
            {
                "version": "~1.14",
                "url": "https://optifine.net/downloads"
            }
        ],
        "advanced": [],
        "incompatible": []
    },
    {
        "name": "OptiFabric",
        "description": "Can be used to run OptiFine on the Fabric Loader\n<b>Note!</b> Optifine should be included in your 'mods' folder.",
        "loader": ["fabric", "legacy-fabric"],
        "version": "1.14,~1.8",
        "downloads": [
            {
                "version": "1.14",
                "url": "https://www.curseforge.com/minecraft/mc-mods/optifabric/files/2843851"
            },
            {
                "version": "~1.8",
                "url": "https://github.com/RedLime/OptiFabric/releases/latest"
            }
        ],
        "advanced": [],
        "incompatible": []
    },
    {
        "name": "Sodium",
        "description": "Modern rendering engine and client-side optimization mod for Minecraft",
        "loader": ["fabric"],
        "version": "1.15-1.17",
        "downloads": [
            {
                "version": "1.15",
                "build": "0.1.1",
                "url": "https://github.com/mrmangohands/sodium-fabric/releases/tag/mc1.15.2-0.1.1-SNAPSHOT%2B2020-12-10"
            },
            {
                "version": "1.16",
                "build": "0.2.0",
                "url": "https://github.com/mrmangohands/sodium-fabric/releases/tag/mc1.16.1-0.2.0%2Bbuild.17"
            },
            {
                "version": "1.17",
                "build": "0.3.4",
                "url": "https://modrinth.com/mod/sodium/version/Fz37KqRh"
            }
        ],
        "advanced": [],
        "incompatible": []
    },
    {
        "name": "Starlight",
        "description": "Rewrites the light engine to fix lighting performance and lighting errors",
        "loader": ["fabric"],
        "version": "1.15-1.17",
        "downloads": [
            {
                "version": "1.15",
                "build": "1.0.0-alpha",
                "url": "https://github.com/dariasc/Starlight/releases/tag/1.15%2F1.0.0-alpha"
            },
            {
                "version": "1.16",
                "build": "1.0.0-RC2",
                "url": "https://github.com/PaperMC/Starlight/releases/tag/1.0.0-RC2"
            },
            {
                "version": "1.17",
                "build": "1.0.0",
                "url": "https://modrinth.com/mod/starlight/version/nc7qGadJ"
            }
        ],
        "advanced": [],
        "incompatible": ['Phosphor']
    },
    {
        "name": "Lithium",
        "description": "No-compromises game logic/server optimization mod",
        "loader": ["fabric"],
        "version": "1.16-1.17",
        "downloads": [
            {
                "version": "1.16",
                "build": "0.6.6",
                "url": "https://github.com/mrmangohands/lithium-fabric/releases/tag/mc1.16.1-0.6.6"
            },
            {
                "version": "1.17",
                "build": "0.7.5",
                "url": "https://modrinth.com/mod/lithium/version/FHFKMKeu"
            }
        ],
        "advanced": [],
        "incompatible": []
    },
    {
        "name": "Krypton",
        "description": "Optimizes the Minecraft networking stack and entity tracker.",
        "loader": ["fabric"],
        "version": "1.16-1.17",
        "downloads": [
            {
                "version": "1.16",
                "build": "0.1.3-SNAPSHOT+2021-02-20",
                "url": "https://github.com/mrmangohands/krypton/releases/tag/mc1.16.1-0.1.3-SNAPSHOT%2B2021-02-20"
            },
            {
                "version": "1.17",
                "build": "0.1.4",
                "url": "https://github.com/astei/krypton/releases/tag/v0.1.4"
            }
        ],
        "advanced": [],
        "incompatible": []
    },
    {
        "name": "Dynamic FPS",
        "description": "Improve performance when Minecraft is in the background",
        "loader": ["fabric"],
        "version": "1.15-1.16",
        "downloads": [
            {
                "version": "1.15",
                "build": "2.0.4",
                "url": "https://cdn.discordapp.com/attachments/816880312415027280/926260415900561408/dynamic-fps-2.0.4-but-different.jar"
            },
            {
                "version": "1.16",
                "build": "0.1",
                "url": "https://cdn.discordapp.com/attachments/830250875376107542/880559489735086100/dynamic-menu-fps-0.1.jar"
            }
        ],
        "advanced": [],
        "incompatible": []
    },
    {
        "name": "SpeedRunIGT",
        "description": "In-game Timer for Minecraft Speedrun",
        "loader": ["fabric", "legacy-fabric"],
        "version": "*",
        "downloads": [
            {
                "version": "*",
                "url": "https://redlime.github.io/SpeedRunIGT/"
            }
        ],
        "advanced": [],
        "incompatible": []
    },
    {
        "name": "Atum",
        "description": "Automatically reset random and set seeds",
        "loader": ["fabric", "legacy-fabric"],
        "version": "1.8-1.18",
        "downloads": [
            {
                "version": "1.8-1.18",
                "url": "https://github.com/VoidXWalker/Atum/releases/latest"
            }
        ],
        "advanced": [],
        "incompatible": ['AutoReset']
    },
    {
        "name": "Auto Reset",
        "description": "Adds a mode where it automatically resets the world after quitting.",
        "loader": ["fabric"],
        "version": "1.14+",
        "downloads": [
            {
                "version": "1.14+",
                "build": "1.2.0",
                "url": "https://github.com/DuncanRuns/AutoResetMod/releases/tag/v1.2.0"
            }
        ],
        "advanced": [],
        "incompatible": ['Atum']
    },
    {
        "name": "Fast Reset",
        "description": "Skip saving the world when leaving the world to faster reset.",
        "loader": ["fabric"],
        "version": "1.15-1.17",
        "downloads": [
            {
                "version": "1.15",
                "build": "1.0.1",
                "url": "https://github.com/jan-leila/FastReset/releases/tag/1.15.2-1.0.1"
            },
            {
                "version": "1.16",
                "summary": "for 1.16.1",
                "build": "1.4.1",
                "url": "https://github.com/jan-leila/FastReset/releases/tag/1.16.1-1.4.1"
            },
            {
                "version": "1.17",
                "build": "1.0.1",
                "url": "https://github.com/jan-leila/FastReset/releases/tag/1.17.1-1.0.1"
            }
        ],
        "advanced": [
            {
                "version": "1.16",
                "summary": "for 1.16.5",
                "url": "https://github.com/jan-leila/FastReset/releases/tag/1.16.5-1.0.0"
            }
        ],
        "incompatible": []
    },
    {
        "name": "LazyDFU",
        "description": "Makes the initialization of DataFixerUpper \"lazy\", making the game start more quickly",
        "loader": ["fabric"],
        "version": "1.15+",
        "downloads": [
            {
                "version": "1.15+",
                "url": "https://modrinth.com/mod/lazydfu/version/C6e265zK"
            }
        ],
        "advanced": [],
        "incompatible": []
    },
    {
        "name": "Voyager",
        "description": "Fixes a rare CME (ConcurrentModificationException) when using java 11+",
        "loader": ["fabric"],
        "version": "1.15+",
        "downloads": [
            {
                "version": "1.15+",
                "url": "https://github.com/modmuss50/Voyager/releases/latest"
            }
        ],
        "advanced": [],
        "incompatible": []
    },
    {
        "name": "Force Port",
        "description": "A fabric mod which forces the port of the \"open to lan\" feature to be 25565.",
        "loader": ["fabric", "legacy-fabric"],
        "version": "~1.8,1.15+",
        "downloads": [
            {
                "version": "1.15+",
                "build": "1.1.0",
                "url": "https://github.com/DuncanRuns/Force-Port-Mod/releases/tag/v1.1.0"
            },
            {
                "version": "~1.15",
                "build": "1.1.0",
                "url": "https://github.com/marinersfan824/Force-Port-Mod/releases/tag/v1.0.0"
            }
        ],
        "advanced": [],
        "incompatible": []
    },
    {
        "name": "TabFocus",
        "description": "Implement button focus by press tab feature in Pre-1.9",
        "loader": ["legacy-fabric"],
        "version": "~1.8",
        "downloads": [
            {
                "version": "~1.8",
                "build": "1.1.0",
                "url": "https://github.com/RedLime/TabFocus/releases/latest"
            }
        ],
        "advanced": [],
        "incompatible": []
    }
];