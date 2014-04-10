namespace MI9App.Web.Models
{
    public class ShowModel
    {
        public bool Drm { get; set; }
        public int EpisodeCount { get; set; }
        public string Slug { get; set; }
        public string Title { get; set; }

        public ImageModel Image { get; set; }
    }
}