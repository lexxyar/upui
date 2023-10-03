<script setup lang="ts">
import {computed} from "vue";

type TMime = "undefined" | "application/zip"
// const mimeTypes = {
//     ".aac": "audio/aac",
//     ".abw": "application/x-abiword",
//     ".arc": "application/x-freearc",
//     ".avi": "video/x-msvideo",
//     ".azw": "application/vnd.amazon.ebook",
//     ".bin": "application/octet-stream",
//     ".bmp": "image/bmp",
//     ".bz": "application/x-bzip",
//     ".bz2": "application/x-bzip2",
//     ".csh": "application/x-csh",
//     ".css": "text/css",
//     ".csv": "text/csv",
//     ".doc": "application/msword",
//     ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//     ".eot": "application/vnd.ms-fontobject",
//     ".epub": "application/epub+zip",
//     ".gz": "application/gzip",
//     ".gif": "image/gif",
//     ".htm": "text/html",
//     ".html": "text/html",
//     ".ico": "image/vnd.microsoft.icon",
//     ".ics": "text/calendar",
//     ".jar": "application/java-archive",
//     ".jpeg": ".jpg",
//     ".js": "text/javascript",
//     ".json": "application/json",
//     ".jsonld": "application/ld+json",
//     ".mid": ".midi",
//     ".mjs": "text/javascript",
//     ".mp3": "audio/mpeg",
//     ".mpeg": "video/mpeg",
//     ".mpkg": "application/vnd.apple.installer+xml",
//     ".odp": "application/vnd.oasis.opendocument.presentation",
//     ".ods": "application/vnd.oasis.opendocument.spreadsheet",
//     ".odt": "application/vnd.oasis.opendocument.text",
//     ".oga": "audio/ogg",
//     ".ogv": "video/ogg",
//     ".ogx": "application/ogg",
//     ".opus": "audio/opus",
//     ".otf": "font/otf",
//     ".png": "image/png",
//     ".pdf": "application/pdf",
//     ".php": "application/php",
//     ".ppt": "application/vnd.ms-powerpoint",
//     ".pptx": "application/vnd.openxmlformats-officedocument.presentationml.presentation",
//     ".rar": "application/vnd.rar",
//     ".rtf": "application/rtf",
//     ".sh": "application/x-sh",
//     ".svg": "image/svg+xml",
//     ".swf": "application/x-shockwave-flash",
//     ".tar": "application/x-tar",
//     ".tif": "image/tiff",
//     ".tiff": "image/tiff",
//     ".ts": "video/mp2t",
//     ".ttf": "font/ttf",
//     ".txt": "text/plain",
//     ".vsd": "application/vnd.visio",
//     ".wav": "audio/wav",
//     ".weba": "audio/webm",
//     ".webm": "video/webm",
//     ".webp": "image/webp",
//     ".woff": "font/woff",
//     ".woff2": "font/woff2",
//     ".xhtml": "application/xhtml+xml",
//     ".xls": "application/vnd.ms-excel",
//     ".xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//     ".xml": "XML",
//     ".xul": "application/vnd.mozilla.xul+xml",
//     ".zip": "application/zip",
//     ".3gp": "video/3gpp",
//     ".3g2": "video/3gpp2",
//     ".7z": "application/x-7z-compressed"
// }
const emit = defineEmits<{
  (e: 'delete'): void,
}>()
const props = withDefaults(defineProps<{
  name: string,
  size?: number,
  mime?: TMime,
  deletable?: boolean,
}>(), {
  size: 0,
  mime: "undefined",
  deletable: true,
})

const sSize = computed(() => {
  return humanFileSize(props.size)
})

const humanFileSize = (bytes: number, si: boolean = true, dp: number = 1): string => {
  const thresh = si ? 1000 : 1024

  if (Math.abs(bytes) < thresh) {
    return bytes + ' B'
  }

  const units = si
      ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
      : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']
  let u = -1
  const r = 10 ** dp

  do {
    bytes /= thresh
    ++u
  } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1)

  return bytes.toFixed(dp) + ' ' + units[u]
}

</script>

<template>
  <div
      class="relative p-4 w-36 h-36 overflow-hidden border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-sm text-gray-900 dark:text-white"
  >
    <div
        class="absolute left-0 top-0 w-full h-full flex justify-center items-center text-gray-200 dark:text-gray-600">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
           stroke="currentColor"
           class="w-28 h-28">
        <path stroke-linecap="round" stroke-linejoin="round"
              d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/>
      </svg>
    </div>

    <div class="absolute left-0 top-0 w-full h-full">
      <div class="p-4 text-gray-900 dark:text-gray-100">
        <div class="break-words mb-4">{{ name }}</div>
        <div>{{ sSize }}</div>
        <!--                <div>{{ mime }}</div>-->
      </div>

      <div class="absolute bottom-1 left-0 right-0 h-6 px-1 flex justify-end gap-2">
        <div
            @click="$emit('delete')"
            class="rounded-full w-6 h-6 text-red-600 flex items-center justify-center cursor-pointer hover:text-red-400">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
               stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>
