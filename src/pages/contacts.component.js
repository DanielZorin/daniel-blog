import React from 'react'
import './contacts.style.scss'

const ContactsPage = () => {
    return <>
        <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        <table>
            <tbody>
                <tr>
                    <td className="social">
                        <a href="https://juan.livejournal.com/">
                            <span className="fa">
                                <img src="https://ic.pics.livejournal.com/juan/8338504/692734/692734_900.png"
                                    alt="" width="19" title="lj" />
                            </span> <b> juan</b>
                        </a>
                    </td>
                    <td><div className="commentary">Блог в ЖЖ, там те же рассказы, только про каждый город отдельно</div></td>
                </tr>
                <tr>
                    <td className="social"><a href="https://www.instagram.com/danielzorin/"><span className="fa fa-instagram"></span> danielzorin</a></td>
                    <td><div className="commentary">Инстаграм, сюда я выкладываю красивые фото</div></td>
                </tr>
                <tr>
                    <td className="social"><a href="https://t.me/worldenddominator"><span className="fa fa-telegram"></span> @danielzorin</a></td>
                    <td><div className="commentary">Телеграм-канал с рассуждениями</div></td>
                </tr>
                <tr>
                    <td className="social"><a href="https://vk.com/id11332"><span className="fa fa-vk"></span> id11332</a></td>
                    <td><div className="commentary">Репосты из ЖЖ</div></td>
                </tr>
                <tr>
                    <td className="social"><a href="https://www.facebook.com/daniel.zorin1"><span className="fa fa-facebook"></span> Daniel Zorin</a></td>
                    <td><div className="commentary">Репосты из инстаграма</div></td>
                </tr>
            </tbody>
        </table>
    </>
}

export default ContactsPage;