using MI9App.Web.Filters;
using MI9App.Web.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Mvc;

namespace MI9App.Web.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public ActionResult GetTestInput()
        {
            using (var sr = new StreamReader(Server.MapPath("~/Content/SourceData/TestInput.txt")))
            {
                return JavaScript(sr.ReadToEnd());
            }
        }

        [HttpPost, CustomerErrorHandler]
        public ActionResult Post(RequestModel request)
        {
            var items = request.Payload.Where(x => x.EpisodeCount > 0 && x.Drm)
                .Select(x =>
                    new ResponseItemModel
                    {
                        Image = x.Image.ShowImage,
                        Slug = x.Slug,
                        Title = x.Title
                    }).ToList();

            return new JsonCamelCaseResult(new ResponseModel
            {
                Response = items
            }, JsonRequestBehavior.DenyGet);
        }

        [HttpPost]
        public ActionResult LogError(object options)
        {
            return Json(new { @d = "OK" });
        }
    }
}
