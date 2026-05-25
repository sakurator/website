type Props = {
    audioNames: string[];
};

export default function PreloadAudios({
    audioNames,
}: Props) {
    const audios = audioNames.map(audioName =>
        <audio key={audioName} preload="auto">
            <source
                src={`/static/sounds/${audioName}.mp3`}
                type="audio/mpeg"
            ></source>
        </audio>
    );
    return (
        <>
            {audios}
        </>
    );
}

