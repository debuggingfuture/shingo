import { File, Filelike, Web3Storage, getFilesFromPath } from 'web3.storage'

// export const getClient = ()=>{

// }

export const uploadWithPaths = async (paths: string[])=>{

    const token = process.env.WEB3_STORAGE_TOKEN || '';
    const storage = new Web3Storage({ token })
    const files = await getFilesFromPath(paths);
    

    // console.log(`Uploading ${files.length} files`)
    const cid = await storage.put(files as Iterable<Filelike>)
    console.log('cid', cid);

    return cid;
}


export const uploadWithValues = async (values: any[])=>{

    const token = process.env.WEB3_STORAGE_TOKEN || '';
    const storage = new Web3Storage({ token })

    const files = values.map((v, i)=>{        
        const buffer = Buffer.from(JSON.stringify(v));
        return new File([buffer], i.toString());
    })  as Iterable<Filelike>;

    const cid = await storage.put(files, {
        wrapWithDirectory : false
    });


    return cid;
}
