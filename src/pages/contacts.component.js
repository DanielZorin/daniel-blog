import React from 'react'
import './contacts.style.scss'

const ContactsPage = () => {
    return <>
        <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        <table>
            <tr>
                <td class="social">
                    <a href="https://juan.livejournal.com/">
                        <span class="fa">
                            <img src="https://ic.pics.livejournal.com/juan/8338504/692734/692734_900.png"
                                alt="" width="19" title="lj" />
                        </span> <b> juan</b>
                    </a>
                </td>
                <td><div class="commentary">Блог в ЖЖ, там те же рассказы, только про каждый город отдельно</div></td>
            </tr>
            <tr>
                <td class="social"><a href="https://www.instagram.com/danielzorin/"><span class="fa fa-instagram"></span> danielzorin</a></td>
                <td><div class="commentary">Инстаграм, сюда я выкладываю красивые фото</div></td>
            </tr>
            <tr>
                <td class="social"><a href="https://t.me/worldenddominator"><span class="fa fa-telegram"></span> @danielzorin</a></td>
                <td><div class="commentary">Телеграм-канал с рассуждениями</div></td>
            </tr>
            <tr>
                <td class="social"><a href="https://vk.com/id11332"><span class="fa fa-vk"></span> id11332</a></td>
                <td><div class="commentary">Репосты из ЖЖ</div></td>
            </tr>
            <tr>
                <td class="social"><a href="https://www.facebook.com/daniel.zorin1"><span class="fa fa-facebook"></span> Daniel Zorin</a></td>
                <td><div class="commentary">Репосты из инстаграма</div></td>
            </tr>
        </table>
    </>
}

export default ContactsPage;