const express = require('express')
const bodyParser = require('body-parser')
// const crypto = require('crypto')
// const token = process.env.SLACK_TOKEN;
// const web = new WebClient(token);
const app = express()
const nacl = require('tweetnacl');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const router = express.Router()
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))
const Monkey = require('monkey-typewriter')


const verify_discord = ()=>{
     

// Your public key can be found on your application in the Developer Portal
const PUBLIC_KEY = 'b4e179f42c1fc742c9094e2af2c275da05db43b4ce62524c2e2760b564375fa4';


}
router.post('/discord_events', (req, res) => {
     console.log('discord event')
     console.log(req.headers)
     console.log(req.body)

     const signature = req.get('X-Signature-Ed25519');
     const timestamp = req.get('X-Signature-Timestamp');
     const body = req.rawBody; // rawBody is expected to be a string, not raw bytes

     const isVerified = nacl.sign.detached.verify(
     Buffer.from(timestamp + body),
     Buffer.from(signature, 'hex'),
     Buffer.from(PUBLIC_KEY, 'hex')
     );
     console.log(isVerified)

     if (!isVerified) {
     return res.status(401).end('invalid request signature');
     }


     return res.sendStatus(200)
})

router.get('/', (req, res) => {
     console.log('received a [GET] ')

     let w  = Monkey.word()
     let l = w.length+1 - 4;
     let fill = (c,n)=>{
          return Array.apply(null, Array(n)).map(l=>{
               return c
          }).join('')
     }

     let monkey = `
        ${fill(' ',l)}         .="=.
        ${fill(' ',l)}               _/.-.-.\\_     _
        ${fill(' ',l)}               (( o o ) )    ))
        ${fill(' ',l)}               |/  "  \\|    //
       .-${fill('-',l)}------.        \\'---'/    //
    _|  ${w}  |_       /'"""'\\  ((
=(_|__${fill('_',l)}______|_)=    / /_,_\\ \\ \\\\
      |::${fill(':',l)}:::::::|       \\_\\_'__/ \\  ))
     |::${fill(':',l)}:::::[]|       /'  /'~\\  |//
    |o=${fill('=',l)}======.|      /   /    \\  /
  '""${fill('"',l)}"""""""' '--',--'\\/\\    /
        ${fill(' ',l)}           '-- "--'  '--'
                   `

     res.send(`
     <center><pre>${monkey}</pre></center>
     <center style='font:sans-serif;'>
     <div><a href="https://www.npmjs.com/package/monkey-typewriter">npm</a></div
     <div><a href="https://app.cyclic.sh">deploy</a></div>
     </center>
     `)
})

app.use('/', router)
app.listen(process.env.PORT)