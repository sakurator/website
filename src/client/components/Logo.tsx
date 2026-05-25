import "../../sass/components/Logo.sass";

export default function Logo() {
    return (
        <div className="logo">
            <img className="logo__image" src="/static/images/logos/sakurator.svg" />
            <span className="logo__title">Sakurator</span>
        </div>
    )
}
