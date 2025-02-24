let handler = async (m, { conn }) => {  
    let mensajes = [  
        "📜 Mensaje 1",  
        "📜 Mensaje 2",  
        "📜 Mensaje 3"  
    ];  
      
    let mensajeAleatorio = mensajes[Math.floor(Math.random() * mensajes.length)];  
      
    conn.sendMessage(m.chat, {  
        text: mensajeAleatorio,  
        footer: 'Interactive Msj',  
        buttons: [  
            {  
                buttonId: `.test`,  
                buttonText: { displayText: 'Siguiente' }  
            }  
        ],  
        headerType: 1  
    }, { quoted: m });  
};  

handler.tag = ['emox'];  
handler.help = ['mensajexxx'];  
handler.command = ['test', 'testx'];  

export default handler;