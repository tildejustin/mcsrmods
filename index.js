const minecraft_versions = [];
const mods = [];

const { compareVersions, compare, satisfies, validate } = window.compareVersions
let needRefresh = false;

const typeOptions = {
    version: "1.16.1",
    run: 'rsg',
    os: null,
    accessibility: false
}

function initVersions() {
    const params = new URLSearchParams(window.location.search);
    $('#game-versions').html(`<select id="game-versions-select" class="browser-default">${minecraft_versions.map(version => {
        const selected = (params.has('version') ? version == params.get('version') : typeOptions.version == null);
        if (selected) {
            typeOptions.version = version;
        }
        return `<option value="${version}" ${selected ? 'selected' : ''}>${version}</option>`;
    }).join('')}</select>`);
    M.FormSelect.init($('#game-versions-select'));

    if (params.has('run')) $("input[name='run-type'][value='" + params.get('run') + "']").prop("checked", true);

    if (params.has('os')) typeOptions.os = params.get('os');
    else {
        const platform = navigator.platform.toLocaleLowerCase();
        if (platform.includes('mac') || platform.includes('osx')) typeOptions.os = 'osx';
        else if (platform.includes('linux')) typeOptions.os = 'linux';
        else typeOptions.os = 'windows';
    }
    $("input[name='os-type'][value='" + typeOptions.os + "']").prop("checked", true);
}

function initResources() {
    $('#resources-tab').addClass('collapsible');
    $('#resources-tab').html(mods.filter(mod => mod.versions.find(version => version.target_version.find(gv => satisfiesVersion(gv)) && rulesCheck(mod))).map(mod => getElementFromModInfo(mod)).join(''));
    var fabric_text
    if (compareVersions(typeOptions.version, "1.13.2") == 1) {
        fabric_text = "The following mods use the <a href=\"https://fabricmc.net/use/installer/\">Fabric Loader</a>."
    } else {
        fabric_text = "The following mods use <a href=\"https://legacyfabric.net/downloads.html\">Legacy Fabric</a>. Legal MultiMC instance <a href=\"https://github.com/Minecraft-Java-Edition-Speedrunning/legacy-fabric-instance-generator/releases\">here</a>."
    }
    var optifine_text = ""
    if (compareVersions(typeOptions.version, "1.7.2") <= 0) {
        optifine_text = "\n <a href=\"https://github.com/speedycube64/Complete_OptiFine_Archive_Pre_1.9\">Optifine</a> is allowed for this version and is a dependency of Optifabric."
    } else if (compareVersions(typeOptions.version, "1.14.4") <= 0) {
        optifine_text = "\n <a href=\"https://optifine.net/home\">Optifine</a> is allowed for this version and is a dependency of Optifabric."
    }
    $("#fabric_text").html(fabric_text)
    $("#optifine_text").html(optifine_text)
}

$(document).ready(() => {
    fetch("https://raw.githubusercontent.com/tildejustin/mcsr-meta/main/important_versions.json").then(response => response.json()).then(it => minecraft_versions.push(...it)).then(_ => initVersions())
    fetch("https://raw.githubusercontent.com/tildejustin/mcsr-meta/main/mods.json").then(response => response.json()).then(json => {
        for (const mod of json.mods) {
            mods.push(mod)
        }
        initResources()
        setInterval(() => {
            const currentVersion = $('#game-versions-select').val();
            if (currentVersion != typeOptions.version && typeOptions.version != null) {
                typeOptions.version = currentVersion;
                needRefresh = true;
            }

            const currentRun = $('input[name="run-type"]:checked').val();
            if (currentRun != typeOptions.run) {
                typeOptions.run = currentRun;
                needRefresh = true;
            }

            const accessibilitySelected = $('input:checkbox[name="accessibility"]').is(":checked") == true;
            if (accessibilitySelected != typeOptions.accessibility) {
                typeOptions.accessibility = accessibilitySelected;
                needRefresh = true;
            }

            const currentOS = $('input[name="os-type"]:checked').val();
            if (currentOS != typeOptions.os) {
                typeOptions.os = currentOS;
                needRefresh = true;
            }

            if (needRefresh) {
                history.replaceState(null, null, window.location.origin + window.location.pathname + "?version=" + typeOptions.version + "&run=" + typeOptions.run + "&os=" + typeOptions.os);
                initResources();
                needRefresh = false;
            }
        }, 50);

    })
});

$('[id^="mod-version-"]').click(function () {
    activeVersion(+($(this)[0].id.replace("mod-version-", '')), false);
});


// Return Mod HTML String
function getElementFromModInfo(mod) {
    const build = mod.versions.find(mod_version => mod_version.target_version.find(gv => satisfiesVersion(gv)) && rulesCheck(mod));
    return `<li>` +
        //Mod Name & Version & Mod Loader
        `<div class="collapsible-header light-font"><b>${mod.name}</b>${`<small style="padding-left: 0.5em;">(${build.version})</small>`}</div>` +

        `<div class="collapsible-body">` +
        //Mod Description
        (mod.description ? `<div>Description<br><small class="light-font description">${mod.description.replaceAll('\n', '<br>')}</small></div>` : '') +

        //Incompatible mod list
        (mod.incompatibilities?.length ? `<div>Incompatible Mods<br><small class="light-font description">You can't use it with one of these: ${mod.incompatibilities.join(', ')}</small></div>` : '') +

        //Download Button
        (build.url ? `<div><a class="light-font waves-effect waves-light btn" href="${build.url}" target="_blank">Download</a></div>` : '') +

        // //Page Button
        // (build.page ? `<div><a class="light-font waves-effect waves-light btn" href="${build.page}" target="_blank">Open Page</a></div>` : '') +
        `</div>` +
        `</li>`;
}

function satisfiesVersion(game_version) {
    try {
        return satisfies(typeOptions.version, game_version);
    } catch (e) {
        console.log(e)
    }

}

function rulesCheck(mod) {
    if (mod.modid == "sodium" && typeOptions.os == "osx") return false
    if (mod.traits.length != 0)
        for (const rule of mod.traits) {
            if (rule == "ssg-only" && typeOptions.run == "rsg") return false
            if (rule == "rsg-only" && typeOptions.run != "ssg") return false
            if (rule == "mac-only" && typeOptions.os != "osx") return false
            if (rule == "accessibility" && !typeOptions.accessibility) return false
        }
    return true;
}
