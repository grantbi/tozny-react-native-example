import Tozny from '@toznysecure/sdk/node'
// import { Blob } from 'buffer'
import { REALM, API_URL } from "@env"
import { Readable } from 'stream'

class ToznyService {
    constructor() {
        this.groupIdMap = {}
        this.realmName = REALM
        this.createRealm(this.realmName)
        this.identity
    }

    createRealm(name) {
        this.realmName = name
        const appName = 'account'
        const brokerTargetUrl = `https://id.tozny.com/${name}/recover`
        this.realm = new Tozny.identity.Realm(
            name,
            appName,
            brokerTargetUrl,
            API_URL,
        )
    }

    async login(username, password) {
        this.identity = await this.realm.login(username, password).catch(console.log)
        return this.identity
    }

    async createFileRecord(base64Data) {
        const imgBufferSmall = Buffer.from(base64Data, 'base64')
        
        try {
            const stream = new Readable()
            stream._read = () => {
                stream.push(imgBufferSmall)
                stream.push(null)
            }
            console.log("Attempting to write file record with stream.")
            await this.identity.storage.writeFile('profile-image', stream, { encoding: 'base64' })
            .then(async data => {
                const profileImgRecord = await data?.record?.()
                console.log("profile image written:", data)
            })
            .catch(e => console.log('Error attempt 1:', e))
        } catch(e) {
            console.log("Error attempt #1", e)
        }
        
        /* try {
            let blob = new Blob([imgBufferSmall], { type: 'image/jpg' })
            console.log("Attempting to write file record with Blob.")
            await this.identity.storage.writeFile('profile-image', blob.stream(), { encoding: 'base64' })
            .then(async data => {
                const profileImgRecord = await data?.record?.()
                console.log("profile image written:", data)
            })
            .catch(e => console.log('Error attempt 2:', e))
        } catch(e) {
            console.log("Error attempt #2", e)
        } */
        
        /* try {
            fetch(base64Data).then(async response => {
                // console.log('response', response)
                const test = await response.blob()
                console.log('test', test)
                
                console.log("Attempting to write file record with Blob stream from fetch.")
                await this.identity.storage.writeFile('profile-image', test.stream(), { encoding: 'base64' })
                .then(async data => {
                    const profileImgRecord = await data?.record?.()
                    console.log("profile image written:", data)
                })
                .catch(e => console.log('Error attempt 3:', e))
            }).catch(e => console.log('Error attempt 3:', e))
        } catch(e) {
            console.log("Error attempt #3", e)
        } */
    }
}

export default new ToznyService()