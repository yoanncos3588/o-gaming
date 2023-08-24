import ContentContainer from '../ContentContainer';
import { GameItem } from './GameItem';
import { SidebarGames } from './SidebarGames';

function Games() {
    return (
        <ContentContainer SidebarLeft={<SidebarGames />}>
            <h1 className="text-3xl font-bold mb-6">
                Games trending right now
            </h1>
            <ul>
                <li className="mb-6">
                    <GameItem
                        id={1}
                        name={'The Elder Scrolls V Skyrim Special Edition'}
                        image={'https://placehold.co/600x300'}
                        publisher={{ id: 0, name: 'Bethesda Softwokrs' }}
                        realeaseDate={'12/02/2014'}
                        totalIssues={133}
                        totalSuggestions={12}
                        description={
                            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ac aliquet mi. Fusce dictum facilisis enim in mollis. Nam eu diam eu diam tristique feugiat. Praesent risus orci, accumsan sit amet dui at, scelerisque sollicitudin sem. Pellentesque gravida ante sed magna sodales, eu feugiat tortor vestibulum. Etiam orci felis, rhoncus a libero sit amet, interdum dictum odio. Ut sagittis nulla dolor, eget auctor ligula pellentesque vel. Maecenas accumsan enim ac neque commodo, sed tincidunt nibh fermentum.'
                        }
                        categories={['FPS', 'Action']}
                    />
                </li>
                <li className="mb-6">
                    <GameItem
                        id={1}
                        name={'The Elder Scrolls V Skyrim Special Edition'}
                        image={'https://placehold.co/600x300'}
                        publisher={{ id: 0, name: 'Bethesda Softwokrs' }}
                        realeaseDate={'12/02/2014'}
                        totalIssues={133}
                        totalSuggestions={12}
                        description={
                            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ac aliquet mi. Fusce dictum facilisis enim in mollis. Nam eu diam eu diam tristique feugiat. Praesent risus orci, accumsan sit amet dui at, scelerisque sollicitudin sem. Pellentesque gravida ante sed magna sodales, eu feugiat tortor vestibulum. Etiam orci felis, rhoncus a libero sit amet, interdum dictum odio. Ut sagittis nulla dolor, eget auctor ligula pellentesque vel. Maecenas accumsan enim ac neque commodo, sed tincidunt nibh fermentum.'
                        }
                        categories={['FPS', 'Action']}
                    />
                </li>
                <li className="mb-6">
                    <GameItem
                        id={1}
                        name={'The Elder Scrolls V Skyrim Special Edition'}
                        image={'https://placehold.co/600x300'}
                        publisher={{ id: 0, name: 'Bethesda Softwokrs' }}
                        realeaseDate={'12/02/2014'}
                        totalIssues={133}
                        totalSuggestions={12}
                        description={
                            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ac aliquet mi. Fusce dictum facilisis enim in mollis. Nam eu diam eu diam tristique feugiat. Praesent risus orci, accumsan sit amet dui at, scelerisque sollicitudin sem. Pellentesque gravida ante sed magna sodales, eu feugiat tortor vestibulum. Etiam orci felis, rhoncus a libero sit amet, interdum dictum odio. Ut sagittis nulla dolor, eget auctor ligula pellentesque vel. Maecenas accumsan enim ac neque commodo, sed tincidunt nibh fermentum.'
                        }
                        categories={['FPS', 'Action']}
                    />
                </li>
                <li className="mb-6">
                    <GameItem
                        id={1}
                        name={'The Elder Scrolls V Skyrim Special Edition'}
                        image={'https://placehold.co/600x300'}
                        publisher={{ id: 0, name: 'Bethesda Softwokrs' }}
                        realeaseDate={'12/02/2014'}
                        totalIssues={133}
                        totalSuggestions={12}
                        description={
                            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ac aliquet mi. Fusce dictum facilisis enim in mollis. Nam eu diam eu diam tristique feugiat. Praesent risus orci, accumsan sit amet dui at, scelerisque sollicitudin sem. Pellentesque gravida ante sed magna sodales, eu feugiat tortor vestibulum. Etiam orci felis, rhoncus a libero sit amet, interdum dictum odio. Ut sagittis nulla dolor, eget auctor ligula pellentesque vel. Maecenas accumsan enim ac neque commodo, sed tincidunt nibh fermentum.'
                        }
                        categories={['FPS', 'Action']}
                    />
                </li>
            </ul>
        </ContentContainer>
    );
}

export default Games;
