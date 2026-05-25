/**
 * Converts HEIC/HEIF images to JPEG format
 * iPhones use HEIC by default, which needs conversion for browser/API compatibility
 */
export async function convertHeicToJpeg(file: File): Promise<{ base64: string; previewUrl: string }> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const url = URL.createObjectURL(file)
    
    img.onload = () => {
      // Create canvas to convert to JPEG
      const canvas = document.createElement('canvas')
      canvas.width = img.naturalWidth
      canvas.height = img.naturalHeight
      
      const ctx = canvas.getContext('2d')
      if (!ctx) {
        URL.revokeObjectURL(url)
        reject(new Error('Failed to create canvas context'))
        return
      }
      
      // Draw image and convert to JPEG
      ctx.drawImage(img, 0, 0)
      
      // Get JPEG as blob
      canvas.toBlob(
        (blob) => {
          URL.revokeObjectURL(url)
          
          if (!blob) {
            reject(new Error('Failed to convert image to JPEG'))
            return
          }
          
          const reader = new FileReader()
          reader.onload = () => {
            const result = reader.result as string
            resolve({
              base64: result.split(',')[1],
              previewUrl: result
            })
          }
          reader.onerror = () => reject(new Error('Failed to read converted image'))
          reader.readAsDataURL(blob)
        },
        'image/jpeg',
        0.92 // Quality
      )
    }
    
    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('Failed to load image'))
    }
    
    img.src = url
  })
}

/**
 * Check if a file is HEIC format
 */
export function isHeicFile(file: File): boolean {
  const heicTypes = ['image/heic', 'image/heif', 'image/avif']
  const heicExtensions = ['.heic', '.heif', '.avif']
  
  return heicTypes.includes(file.type) || 
         heicExtensions.some(ext => file.name.toLowerCase().endsWith(ext))
}
