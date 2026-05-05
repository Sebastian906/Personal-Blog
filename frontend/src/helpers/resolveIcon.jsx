import * as Ai from 'react-icons/ai'
import * as Bi from 'react-icons/bi'
import * as Bs from 'react-icons/bs'
import * as Fa6 from 'react-icons/fa6'
import * as Gi from 'react-icons/gi'
import * as Gr from 'react-icons/gr'
import * as Lu from 'react-icons/lu'
import * as Pi from 'react-icons/pi'
import * as Tb from 'react-icons/tb'
import { GoDot } from 'react-icons/go'

const ALL_ICONS = { ...Ai, ...Bi, ...Bs, ...Fa6, ...Gi, ...Gr, ...Lu, ...Pi, ...Tb }

export const resolveIcon = (iconName, props = {}) => {
    const Icon = iconName ? ALL_ICONS[iconName] : null
    return Icon ? <Icon {...props} /> : <GoDot {...props} />
}