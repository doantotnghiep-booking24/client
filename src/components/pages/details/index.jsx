import classNames from 'classnames/bind';
import styles from './details.module.scss';

const cx = classNames.bind(styles);

function Details() {
    return ( 
        <div className={cx('wrap')}>
            <div className={cx('banner')}>
                <img src="https://setsail.qodeinteractive.com/wp-content/uploads/2018/09/blog-title-img-2.jpg" alt="" className={cx('banner__img')}/>
                <h2 className={cx('banner__title')}>Chi Tiết</h2>
            </div>
            <div className={cx('content')}>
                <div className={cx('content__main')}>
                    <div className={cx('content__home')}>
                        <img src="https://setsail.qodeinteractive.com/wp-content/uploads/2018/09/blog-img-2.jpg" alt="" className={cx('content__home-img')}/>
                        <div className={cx('content__home-text')}>
                            <h1 className={cx('content__home-name')}>Down Town</h1>
                            <div className={cx('content__home-title')}>
                                <p className={cx('content__home-heading')}>Si elit omnes impedit ius, vel et hinc agam fabulas. Ut audiam invenire iracundia vim. Tn eam dimo diam ea. Piber Korem sit amet. Cconsequat tin sit, stet cibo blandit.</p>
                                <span className={cx('content__home-desc')}>Al elit omnes impedit ius, vel et hinc agam fabulas. Ut audiam invenire iracundia vim. En eam dico similique, ut sint posse sit, eum sumo diam ea. Liber consectetuer in mei, sea in imperdiet assueverit contentiones, an his cibo blandit tacimates. Iusto iudicabit similique id velex, in sea rebum deseruisse appellantur. Lorem ipsum Alienum phaedrum torquatos nec eu, vis detraxit pericu in mei, vix aperiri vix at,dolor sit amet. blandit dicant definition.Sit delicata persequeris ex, in sea rebum deseruisse appellantur. Lorem ipsum dolor sit amet.Eos ei nisl graecis, vix aperiri consequat an. Eius lorem.</span>
                                <div className={cx('content__home-sub-heading')}>“Ei elit omnes impedit ius, vel et hinc agam fabulas. Ut audiamre iracundia vim. An eame, ut sint posse sumo diam ea. Cu omnis.”</div>
                                <span className={cx('content__home-sub-desc')}>Ei elit omnes impedit ius, vel et hinc agam fabulas. Ut audiam invenire iracundia vim. An eam dico similique, ut sint posse sit, eum sumo diam ea. Liber consectetuer in mei, sea in imperdiet assueverit contentiones, an his cibo blandit tacimates. Iusto iudicabit similique idefinitionem eos an.Sit delicata persequeris ex, in sea rebum deseruisse appellantur. Lorem ipsum dolor si vix aperiri consequat an.</span>
                            </div>
                            <div className={cx('content__home-image')}>
                                <img src="https://setsail.qodeinteractive.com/wp-content/uploads/2016/09/blog-img-13.jpg" alt="" />
                                <img src="https://setsail.qodeinteractive.com/wp-content/uploads/2018/09/blog-img-22-1300x650.jpg" alt="" className={cx('content__home-image-w')}/>
                            </div>
                            <p className={cx('content__home-desc')}>Ai elit omnes lmpedit ius, tel et hinc agam fabulas. Ut audiam invenire iracundia vim. An eam dico similique, ut sint posse sit, eum sumo diam ea. Liber consectetuer in mei, sea in imperdiet assueverit contentiones, an his cibo blandit tacimates. Iusto iudicabit similique idefinitionem eos an.Sit delicata persequeris ex, in sea rebum deseruisse appellantur. Lorem ipsum dolor si vix aperiri consequat an.</p>

                        </div>


                        <div className={cx('content__home-comment')}>
                            <h2 className={cx('content__home-comment-title')}>Bình Luận</h2>
                            <ul className={cx('content__home-comment-list')}>
                                <li className={cx('content__home-comment-item')}>
                                    <img src="https://randomuser.me/api/portraits/women/60.jpg" alt="" className={cx('content__home-comment-img')}/>
                                    <div className={cx('content__home-comment-content')}>
                                        <p className={cx('content__home-comment-name')}>John Doe</p>
                                        <p className={cx('content__home-comment-text')}>  arcu vitae consectetur congue, justo urna dignissim velit, id consectetur neque felis et velit. Sed pellentesque, lectus vel tristique ultricies, felis nisi dign</p>
                                        <span className={cx('content__home-comment-date')}>12/12/2022,  2024 at 8:09 am</span>
                                    </div>
                                </li>    
                                <li className={cx('content__home-comment-item')}>
                                    <img src="https://randomuser.me/api/portraits/women/60.jpg" alt="" className={cx('content__home-comment-img')}/>
                                    <div className={cx('content__home-comment-content')}>
                                        <p className={cx('content__home-comment-name')}>John Doe</p>
                                        <p className={cx('content__home-comment-text')}>  arcu vitae consectetur congue, justo urna dignissim velit, id consectetur neque felis et velit. Sed pellentesque, lectus vel tristique ultricies, felis nisi dign</p>
                                        <span className={cx('content__home-comment-date')}>12/12/2022,  2024 at 8:09 am</span>
                                    </div>
                                </li>    
                            </ul>
                            
                        </div>


                    </div>
                    <aside>
                           
                    </aside>
                    
                </div>
            </div>
        </div>
     );
}

export default Details;