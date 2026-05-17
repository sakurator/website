let sulfa = null;
let particles = null;
let alphabetParticles = null;
const gravity = 200;
const wind = 400;
const sizeRange = { min: 20, max: 40 };

function initParticles() {
    sulfa = createSulfa({
        imageUriFormat: `/images/particles/{name}_{variation}.svg`,
    });

    particles = {
        petal: sulfa.generator({
            name: "petal",
            variations: 5,
            gravity,
            wind,
            sizeRange,
        }),

        leaf: sulfa.generator({
            name: "leaf",
            variations: 5,
            gravity,
            wind,
            sizeRange,
        }),
    };

    alphabetParticles = {
        hiragana: particles.petal,
        katakana: particles.leaf,
    };
}

function alphabetParticle(alphabetName = alphabet) {
    if (sulfa === null) {
        initParticles();
    }

    return alphabetParticles[alphabetName.toLowerCase()];
}

function splashParticles(position, count, force) {
    alphabetParticle().splash(position, count, force);
}
