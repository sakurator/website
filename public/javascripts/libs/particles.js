const fps = 60;
const min = 20;
const max = 30;
const lifetime = 4500;
const gravity = 0.5;
const wind = 0.05;
let sulfa = null;
let particles = null;
let alphabetParticles = null;

function initParticles() {
    sulfa = createSulfa({
        imageUriFormat: `/images/particles/{name}_{variation}.svg`,
    });

    particles = {
        petal: sulfa.generator({
            name: "petal",
            variations: 5,
            sizeRange: { min, max },
            fps,
            gravity,
            wind,
        }),

        leaf: sulfa.generator({
            name: "leaf",
            variations: 5,
            sizeRange: { min, max },
            fps,
            gravity,
            wind,
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
