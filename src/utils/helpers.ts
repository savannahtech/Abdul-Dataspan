'use client'

 export function generateNumberArray(min:number, max:number) {
    const result = [];
    for (let i = min; i <= max; i++) {
      result.push(`${i}`);
    }
    return result;
  }

export function getImageNameFromKey(imageUrl: string){
    const imagePath = imageUrl?.split(".")?.[0]
    const namePath = imagePath?.split("/");
    const name = namePath[namePath.length - 1];
    return name
}

export async function getFileContent(labelUrl: string){
    fetch(labelUrl)
    .then((response) => (response.text()))
    .catch((error) => console.error('Error unable to fetch photos:', error));
    
  }

 