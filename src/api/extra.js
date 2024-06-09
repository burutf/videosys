import http from '@/utils/axios'

export const getclassifylist = () => {
    return http.get('/getclassifylist')
}