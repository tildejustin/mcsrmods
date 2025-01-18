const minecraft_versions = [];
const mods = [];

const { compareVersions, compare, satisfies, validate } = window.compareVersions
let needRefresh = false;

const typeOptions = {
    version: "1.16.1",
    run: 'rsg',
    os: null,
    accessibility: false,
    obsolete: false
}

function initVersions() {
    const params = new URLSearchParams(window.location.search);
    $('#game-versions').html(`<select id="game-versions-select" class="browser-default">${minecraft_versions.map(version => {
        const selected = (params.has('version') ? version == params.get('version') : typeOptions.version == "null");
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
    $('#resources-tab').html(mods.filter(mod => mod.versions.find(version => version.target_version.find(gv => gv == typeOptions.version) && rulesCheck(mod))).map(mod => getElementFromModInfo(mod)).join(''));
    var fabric_text
    if (compareVersion(typeOptions.version, "1.13.2") == 1) {
        fabric_text = "The following mods use the <a href=\"https://fabricmc.net/use/installer/\">Fabric Loader</a>."
    } else {
        fabric_text = "The following mods use <a href=\"https://legacyfabric.net/downloads.html\">Legacy Fabric</a>. Legal MultiMC instance <a href=\"https://github.com/Minecraft-Java-Edition-Speedrunning/legacy-fabric-instance-generator/releases\">here</a>."
    }
    var optifine_text = ""
    if (compareVersion(typeOptions.version, "1.7.2") <= 0) {
        optifine_text = "\n <a href=\"https://github.com/speedycube64/Complete_OptiFine_Archive_Pre_1.9\">Optifine</a> is allowed for this version and is a dependency of Optifabric."
    } else if (compareVersion(typeOptions.version, "1.14.4") <= 0) {
        optifine_text = "\n <a href=\"https://optifine.net/home\">Optifine</a> is allowed for this version and is a dependency of Optifabric."
    }
    $("#fabric_text").html(fabric_text)
    $("#optifine_text").html(optifine_text)
}

// heh, shouldn't hardcode this stuff but it's just for the fabric link so it's fine for now
versionMap = new Map([
    ["15w14a", "1.8.2"],
    ["1.RV-Pre1", "1.9.2"],
    ["20w14infinite", "1.15.2"],
    ["22w13oneblockatatime", "1.18.2"],
    ["23w13a_or_b", "1.19.4"],
    ["24w14potato", "1.20.4"]
])

function compareVersion(one, two) {
    if (versionMap.get(one) != undefined) one = versionMap.get(one)
    if (versionMap.get(two) != undefined) two = versionMap.get(two)
    try {
        return compareVersions(one, two)
    } catch (error) {
        console.log("not good", one, two)
        return 0 // safe case at least
    }
}

$(document).ready(() => {
    fetch("https://raw.githubusercontent.com/tildejustin/mcsr-meta/schema-6/important_versions.json").then(response => response.json()).then(it => minecraft_versions.push(...it)).then(_ => initVersions())
    fetch("https://raw.githubusercontent.com/tildejustin/mcsr-meta/schema-6/mods.json").then(response => response.json()).then(json => {
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

            const obsoleteSelected = $('input:checkbox[name="obsolete"]').is(":checked") == true;
            if (obsoleteSelected != typeOptions.obsolete) {
                typeOptions.obsolete = obsoleteSelected;
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
    const build = mod.versions.find(version => version.target_version.find(gv => gv == typeOptions.version) && rulesCheck(mod))
    return `<li>` +
        //Mod Name & Version & Mod Loader
        `<div class="collapsible-header light-font"><b>${mod.name}</b>${`<small style="padding-left: 0.5em;">(${build.version})</small>`}</div>` +

        `<div class="collapsible-body">` +
        //Mod Description
        (mod.description ? `<div>Description<br><small class="light-font description">${mod.description.replaceAll('\n', '<br>')}</small></div>` : '') +

        //Incompatible mod list
        (mod.incompatibilities?.length ? `<div>Incompatible Mods<br><small class="light-font description">You can't use it with one of these: ${mod.incompatibilities.map(modid => mods.find(mod_inner => modid == mod_inner.modid).name).join(', ')}</small></div>` : '') +
        `<div style="display: inline-flex;">` +
        //Download Button
        (build.url ? `<div style="padding: 5px;"><a class="light-font waves-effect waves-light btn" href="${build.url}" target="_blank">Download</a></div>` : '') +

        //Page Button
        (mod.sources ? `<div style="padding: 5px;"><a class="light-font waves-effect waves-light btn" href="${mod.sources}" target="_blank">Sources</a></div>` : '') +
        (mod.sources ? `<div style="padding: 5px;"><a class="light-font waves-effect waves-light btn" href="${mod.sources}/issues" target="_blank">Issues</a></div>` : '') +
        `</div>` +
        `</div>` +
        `</li>`;
}

function rulesCheck(mod) {
    if (mod.modid == "sodium" && typeOptions.os == "osx"
        && mods.find(mod => mod.modid == "sodiummac" && mod.versions.find(version => version.target_version.includes(typeOptions.version)) != undefined)) {
        return false
    }
    if ((mod.obsolete == true || mod.versions.find(version => version.target_version.includes(typeOptions.version)).obsolete == true) && !typeOptions.obsolete) return false
    if (mod.traits != undefined && mod.traits.length != 0)
        for (const rule of mod.traits) {
            if (rule == "ssg-only" && typeOptions.run == "rsg") return false
            if (rule == "rsg-only" && typeOptions.run == "ssg") return false
            if (rule == "mac-only" && typeOptions.os != "osx") return false
            if (rule == "accessibility" && !typeOptions.accessibility) return false
        }
    return true;
}
