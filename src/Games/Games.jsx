import ContentContainer from '../ContentContainer';
import { GameItem } from './GameItem';

function Games() {
    return (
        <ContentContainer SidebarLeft={<div>sidebar</div>}>
            <ul>
                <li className="mb-6">
                    <GameItem />
                </li>
                <li className="mb-6">
                    <GameItem />
                </li>
                <li className="mb-6">
                    <GameItem />
                </li>
                <li className="mb-6">
                    <GameItem />
                </li>
                <li className="mb-6">
                    <GameItem />
                </li>
            </ul>
        </ContentContainer>
    );
}

export default Games;
