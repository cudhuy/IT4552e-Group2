import React from 'react';
import { Link } from 'react-router-dom';
import { MyVariable } from '../../variables/variables';
import AddToCardButton from '../Button/AddToCardButton';
import AddToFavoriteButton from '../Button/AddToFavoriteButton';
import './Book.scss'
import { RenderedBook } from './BookRecognization';
import { useEffect, useState } from "react";
const Book = (props) => {
    const bookData = props.bookData;
    var favoriteIconSrc = RenderedBook.favoriteIcon;
    const bookContainStyle = {
        position: 'relative'
    }
    const bookImage = new Image();
    bookImage.src = bookData.image
    const displayElement = document.querySelector('div.book-item')
    const [stateW, setstateW] = useState(window.innerWidth);
    // useEffect(() => {
    //     function handleResize() {
    //       setstateW()
    //     }
    //     window.addEventListener("resize", handleResize);
    //     return () => window.removeEventListener("resize", handleResize);
    //   }, []);

    var detalW = stateW < 600? 168: 294;
    // var detalGridH = window.innerWidth < 600? 10: 30;
    const displayWidth = displayElement === null ? detalW : displayElement.offsetWidth
    const displayHeight = ((displayWidth * bookImage.height / bookImage.width) + ((displayWidth * bookImage.height / bookImage.width) * 30 / 100))
    const bookImageContainStyle = {
        width: '100%',
        'min-width': '200px',
        'max-width': '294px',
        height: `${displayHeight}px`,
        'border-radius': '24px',
        'backgroundColor': 'var(--Blue)',
        'background': `url(${bookData.image}) center center`,
        'background-size': '152% 116%',
    }
    const bookTitleContainStyle = {
        width: '100%',
        'min-width': '200px',
        'max-width': '294px',
        'font-family': 'MontserratMedium',
        'padding-right': '8px',
        'padding-left': '8px',
        'padding-top': '12px'
    }
    const bookTitleStyle = {
        'font-size': '20px',
    }
    const bookAuthorStyle = {
        'font-family': 'MontserratRegular',
        'font-size': '14px'
    }
    var optionsStyle = {
        position: 'absolute',
        top: '60%',
        left: '50%',
        '-ms-transform': 'translate(-50%, -50%)',
        transform: 'translate(-50%, -50%)',
        display: 'none',

    }
    function favoriteOptionStyle(dh, bdImg, book) {
        var img = bdImg
        if(book.isfavorite === 'true'){
            img = `${MyVariable.hostName}/assets/icons/ic-active-favorite.png`
        }
        return {
            'position': 'absolute',
            top: `-${dh - 80}px`,
            right: '-24px',
            background: `url(${img}) center center`,
            width: '48px',
            height: '48px',
        }
    }
    function onClickFavoriteOption(e, dh, book) {
        var bg = (document.getElementById(e.target.id))
        var newImg = '';
        if (book.isfavorite==='false') {
            book.isfavorite = 'true'
            newImg = `${MyVariable.hostName}/assets/icons/ic-active-favorite.png`
        } else {
            book.isfavorite = 'false'
            newImg = `${MyVariable.hostName}/assets/icons/ic-none-favorite.png`
        }
        bg.style = `
        position: absolute;
        top:-${dh - 80}px;
        right: -24px;
        width: 48px;
        height: 48px;
        background: url(${newImg}) center center;`

    }

    function showOptions(e, h, detalW) {
        var target = e.target.id.toString()
        var options = getOptionsByBook(target)
        options.style = `display: block; position: absolute; top: ${h - 48 - 12}px; left: 50%; -ms-transform: translate(-50%, -50%); transform:translate(-50%, -50%);`
        //console.log('w: '+detalW)
    }
    function hideOptions(e) {
        var target = e.target.id.toString()
        var options = getOptionsByBook(target)
        options.style = 'display: none'
    }
    function getOptionsByBook(bookRenderID) {
        var target = bookRenderID.toString()
        var idtarget = target.substr(10, target.length - 10)
        return document.getElementById(`options*${idtarget}`)
    }
    function getIconByBook(bookRenderID) {
        var target = bookRenderID.toString()
        var idtarget = target.substr(10, target.length - 10)
        return document.getElementById(`bookIcon*${idtarget}`)
    }
    function renderIDOptions() {
        RenderedBook.countOptions++
        return `options*${RenderedBook.countOptions - 1}`
    }
    function renderIDBook() {
        RenderedBook.countBook++
        return `bookImage*${RenderedBook.countBook - 1}`
    }
    function renderIDIcon() {
        RenderedBook.countIcon++
        return `bookIcon*${RenderedBook.countIcon - 1}`
    }
    function packageDataToSend(book){
        return book
    }
    return (

        <div style={bookContainStyle} className='book-container-effect' onMouseLeave={(e) => hideOptions(e)}>
            <div style={bookImageContainStyle} className='book-image-effect' id={renderIDBook()} onMouseOver={(e) => showOptions(e, displayHeight, detalW)} >
            </div>
            <div id={renderIDOptions()} className='options' style={optionsStyle} >
                <AddToCardButton bookData={bookData} />
                
                <AddToFavoriteButton top={8}/>
                {/* <div id={renderIDIcon()} style={favoriteOptionStyle(displayHeight, favoriteIconSrc, bookData)} onClick={(e) => onClickFavoriteOption(e, displayHeight, bookData)}></div> */}
            </div>
            <Link to='/bookdetail' state={{ book: packageDataToSend(bookData)}}>
                <div style={bookTitleContainStyle} className='book-container-effect'>
                    <div style={bookTitleStyle} className='book-context-title-effect'>{bookData.title}</div>
                    <div style={bookAuthorStyle}>{bookData.author}</div>
                </div>
            </Link>
        </div>
    );
}

export default Book;
