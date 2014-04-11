using System;
using System.Collections.Generic;

namespace MI9App.Web.Models
{
    public class RequestModel
    {
        public IList<ShowModel> Payload { get; set; }
    }

    public class ResponseModel
    {
        public IList<ResponseItemModel> Response { get; set; }
    }

    public class ImageModel
    {
        public string ShowImage { get; set; }
    }

    public class ShowModel
    {
        public bool Drm { get; set; }
        public int EpisodeCount { get; set; }
        public string Slug { get; set; }
        public string Title { get; set; }

        public ImageModel Image { get; set; }
    }

    public class ResponseItemModel
    {
        public string Image { get; set; }
        public string Slug { get; set; }
        public string Title { get; set; }
    }
}