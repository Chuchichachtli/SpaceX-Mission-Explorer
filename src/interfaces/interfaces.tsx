
export interface IMission {
  id: string
  mission_name: string
  launch_date_utc: string
  launch_success: boolean
  launch_site: ILaunchSite
}
interface ILaunchSite {
  site_name_long: string
}

export interface ILaunchData{
  id : string
  launch_date_utc : string
  launch_site: ILaunchSite
  launch_success : boolean
  mission_name : string
  launch_year : string
  rocket : IRocket
  links : ILinks
}
interface ILinks {
  flickr_images : string[]
  article_link : string
  video_link : string
}
interface IRocket {
  rocket_name : string
}
