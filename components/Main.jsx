import Contents from "./Contents.jsx";

export default function Main() {
    return(
        <div>
            <Contents title="映画A" commentCount={5} imageUrl="a.jpg"/>
            <Contents title="アニメB" commentCount={12} imageUrl="b.jpg" />
            <Contents title="映画C" commentCount={0} imageUrl="c.jpg" />
        </div>
    );
}