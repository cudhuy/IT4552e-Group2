import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MyConstVariable } from '../../variables/MyConstVaeiable';
import { MyVariable } from '../../variables/variables';
import LoginButton from '../Button/LoginButton';
import { BooksInShoppingCart } from '../ShoppingCart/BooksInShoppingCart'
import './Menu.scss'
import { useStore, actions } from '../../store';
import ClickAwayListener from 'react-click-away-listener';
import Tippy from '@tippyjs/react';
import LoadingUserProfile from './Loadding/LoadingUserProfile';
import { render } from '@testing-library/react';
import * as AuthServices from '../../apiServices/AuthServices'
import SearchSuggest from './SearchSuggest/SearchSuggest';
import * as CartServices from '../../apiServices/CartServices'

const Menu = (props) => {
    const navigate = useNavigate()
    setActiveMenu(props.active)
    const [isSearchAble, setIsSearchAble] = useState(false)
    //const [booksInCartAmount, setBooksInCartAmount] = useState(BooksInShoppingCart.length)
    const [state, dispatch] = useStore()
    var { isLogin } = state
    const { booksInCartTotal } = state

    const [isUseUserPopupMenu, setIsUseUserPopupMenu] = useState(false)

    const [searchResult, setSearchResult] = useState([1, 2, 3, 4, 5])
    const [isSuggestSearch, setIsSuggestSearch] = useState(false)
    const [inputSearchValue, setInputSearchValue] = useState('')

    const [userProfile, setUserProfile] = useState(state.userProfile)

    useEffect(()=>{
        checkLogin()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    async function checkLogin() {
        try {
            const profile = await AuthServices.profile()
            console.log('re get profile', profile)
            if(profile !== undefined){
                dispatch(actions.setUserProfile(profile))
                dispatch(actions.loginByUser('user account'))
            }
            
        } catch (err) {
            console.log('no token login')
        }
    }

    function onSearch() {
        var searchInput = document.getElementById('search-bar');
        var searchValue = searchInput.value
        if (searchValue !== "") {
            navigate('/books', { state: { stateName: searchValue } })
        }
    }
    const displayCartNotifyStyle = {
        width: '24px',
        height: '24px',
        borderRadius: '12px',
        backgroundColor: 'var(--Red)',
        fontSize: '12px',
        color: 'var(--Darkest)',
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        position: 'absolute',
        right: '4px',
        top: '4px',
        fontFamily: 'MontserratMedium'
    }
    const noneDisplayCartNotifyStyle = {
        display: 'none'
    }
    const userOptionStyle = {
        display: isLogin === true ? 'flex' : 'none'
    }
    const loginButtonStyle = {
        display: isLogin === false ? 'flex' : 'none'
    }

    const onUseUserPopupMenu = () => {
        setIsUseUserPopupMenu(!isUseUserPopupMenu)
    }

    const userPopupBacgroundImageStyle = (avatar) => ({
        width: '100%',
        height: '100px',
        backgroundColor: 'var(--Pink)',
        position: 'absolute',
        top: '0',
        borderRadius: '8px',
        // background: `url(${avatar}) center center`,
        // bacgroundRepeat: 'no-repeat',
        // backgroundSize: '100%'
    })

    function onUserLogout() {
        const logout = AuthServices.logout()
        dispatch(actions.logoutUser('logout user'))
        setIsUseUserPopupMenu(false)
    }

    function onUseOtherAccount() {
        onUserLogout()
    }

    const renderUserPopupMenu = <div>
        {isUseUserPopupMenu && (
            <ClickAwayListener onClickAway={() => setIsUseUserPopupMenu(false)}>
                <div className={`user-menu-more-container ${isUseUserPopupMenu ? "user-popup-menu-active" : "user-popup-menu-inactive"}`}>
                    <div className='user-popup-avatar'>
                        <div className='user-popup-background-image' style={userPopupBacgroundImageStyle(state.userProfile.avatar)}>
                        </div>
                        <img src={state.userProfile.avatar} alt='avtar' />
                    </div>
                    <p className='user-popup-name no-margin-padding'>{state.userProfile.fullName}</p>
                    <p className='user-popup-email no-margin-padding'>{state.userProfile.email}</p>
                    <div className='user-popup-options'>
                        <button>
                            <img src={require('../../assets/icons/ic-popup-key.png')} alt='password'></img>
                        </button>
                        <button>
                            <img src={require('../../assets/icons/ic-popup-payment.png')} alt='payment'></img>
                        </button>
                        <button>
                            <img src={require('../../assets/icons/ic-popup-location.png')} alt='shipaddress'></img>
                        </button>
                    </div>
                    <div className='user-popup-actions'>
                        <Link to={'/useraccount'}>
                            <div className='user-popup-action'>
                                <button className='user-setting-action-container'>
                                    <div className='action-img-container'>
                                        <img src={require('../../assets/icons/ic-setting.png')} alt='' />
                                    </div>
                                    <span>Cài đặt</span>
                                </button>
                            </div>
                        </Link>
                        <Link to={'/'} state={{ stateName: MyConstVariable.myNullVariable }} onClick={onUserLogout}>
                            <div className='user-popup-action'>
                                <button className={'logout-action-container'}>
                                    <div className='action-img-container '>
                                        <img src={require('../../assets/icons/ic-logout.png')} alt='' />
                                    </div>
                                    <span>Đăng xuất</span>
                                </button>
                            </div>
                        </Link>

                        <div className='user-popup-action'>
                            <button className='use-other-account-container' onClick={onUseOtherAccount}>
                                <div className='action-img-container'>
                                    <img src={require('../../assets/icons/ic-change.png')} alt='' />
                                </div>
                                <span>Sử dụng một tài khoản khác</span>
                            </button>
                        </div>

                    </div>
                </div>
            </ClickAwayListener>
        )}
    </div>

    useEffect(() => {
        if (inputSearchValue.length > 1) {
            setSearchResult([1, 2, 3, 4, 5, 6, 7, 8, 9, 0])
        } else {
            setSearchResult([])
        }
    }, [inputSearchValue])

    function getSuggestSearchItemsStyle() {
        let inputSearch = document.getElementById('search-bar')
        return {
            width: inputSearch.offsetWidth
        }
    }

    const removeSearchValueButtonStyle = {
        display: inputSearchValue.length > 0 ? 'flex' : 'none'
    }

    function onSelectSuggestSearch(suggest) {
        setInputSearchValue(suggest)
        setSearchResult([])
    }

    const getBookInCart = async () => {
        const respone = await CartServices.getBooksInCart()
        setBookInCartTotal(respone.items.length)
        dispatch(actions.updateTotalBookInCart(respone.items.length))
    }

    const [bookInCartTotal, setBookInCartTotal] = useState(state.booksInCartTotal)

    useEffect(() => {
        getBookInCart()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // useEffect(()=>{
    //     setBookInCartTotal(state.booksInCartTotal)
    // },[state.booksInCartTotal])

    return (
        <div id='menu-bounder'>
            <div id='menu-header' class="row">
                <div id='logo-container' class="col-xl-3">
                    <img src={require('../../assets/LogoMain.png')} alt='Logo' />
                </div>
                <div id='search-bar-container' class="col-xl-6">
                    <Tippy
                        interactive={true}
                        visible={searchResult.length > 0}
                        placement={'bottom'}
                        appendTo={document.body}
                        render={(attrs) => (
                            <div className='poper-search-result-container' style={getSuggestSearchItemsStyle()} tabIndex='-1' {...attrs}>
                                {/* {
                                    searchResult.map((item) => (
                                        <SearchSuggest title={item} key={item} onSelectSuggestSearch={onSelectSuggestSearch}/>
                                    ))
                                } */}
                            </div>
                        )}>
                        <input type='text' id='search-bar'
                            placeholder={MyVariable.PlacseHolderForSearchBar}
                            onChange={(e) => {
                                setInputSearchValue(e.target.value)
                            }}
                            value={inputSearchValue}
                        />
                    </Tippy>
                    {/* <input type='text' id='search-bar' placeholder={MyVariable.PlacseHolderForSearchBar} /> */}
                    <button style={removeSearchValueButtonStyle} onClick={() => { setInputSearchValue('') }}>
                        <img src={require('../../assets/icons/ic-close.png')} alt='remove' />
                    </button>
                    <img className='search-bar-btn-search' src={require('../../assets/icons/ic-search.png')} alt='search icon' onClick={() => onSearch()} />
                </div>
                <div class="col-xl-3 menu-btn-container-col">
                    <div className='menu-btn-login-container' style={loginButtonStyle}><LoginButton /></div>
                    {
                        state.isLogin === true && state.userProfile !== 'none' ?
                            <div className='user-menu-container'>
                                <Link to={'/useraccount'} onClick={() => { dispatch(actions.selectUserTbIndex(2)) }}>
                                    <div className='user-menu-notification-container'>
                                        <div className='user-menu-notification-value'>3</div>
                                        <button className='user-menu-notification'>
                                            <img src={require('../../assets/icons/ic-notification.png')} alt='notification' />
                                        </button>
                                    </div>
                                </Link>
                                <Link to={'/useraccount'} onClick={() => { dispatch(actions.selectUserTbIndex(1)) }}>
                                    <button className='menu-btn-avtar' style={userOptionStyle}>
                                        <img src={state.userProfile.avatar} alt='avtar' />
                                        <span>{state.userProfile.lastName}</span>
                                    </button>
                                </Link>
                            </div> :
                            state.isLogin === true && state.userProfile === 'none' ?
                                <LoadingUserProfile /> :
                                ''
                    }
                    {
                        state.isLogin === true && state.userProfile !== 'none' ?
                            <button className='menu-btn-user-menu-more' style={userOptionStyle} onClick={onUseUserPopupMenu}>
                                <img src={require('../../assets/icons/ic-menu-more.png')} alt='menu-more'></img>
                            </button>
                            : ''
                    }
                </div>
            </div>
            <div className='menu-component row'>
                {MyVariable.MenuData.map((menu) => (
                    <div className='menu-parent-content col-12'
                        id={menu.active === 'true' ? 'active-menu-parent' : 'inactive-menu-parent'}
                    >
                        <Link to={menu.path} state={{ stateName: MyConstVariable.myNullVariable }}><a href='/'>{menu.title}
                            <div style={menu.title === 'Giỏ Hàng' && bookInCartTotal > 0 ? displayCartNotifyStyle : noneDisplayCartNotifyStyle}>
                                {bookInCartTotal}
                            </div>
                        </a></Link>
                    </div>
                ))}
            </div>
            {
                state.isLogin === true && state.userProfile !== 'none' ?
                    renderUserPopupMenu :
                    ''
            }
        </div>
    );
}
function setActiveMenu(menuTile) {
    MyVariable.MenuData.forEach(menu => {
        if (menu.title === menuTile) {
            menu.active = 'true'
        } else {
            menu.active = 'false'
        }
    });
}

export default Menu;
