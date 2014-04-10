using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace MI9App.Web.Filters
{
    public class JsonCamelCaseResult : ActionResult
    {
        public JsonRequestBehavior JsonRequestBehavior { get; set; }
        public Encoding ContentEncoding { get; set; }
        public string ContentType { get; set; }
        public object Data { get; set; }

        public JsonCamelCaseResult(object data, JsonRequestBehavior jsonRequestBehavior)
        {
            Data = data;
            JsonRequestBehavior = jsonRequestBehavior;
        }

        public override void ExecuteResult(ControllerContext context)
        {
            if (context == null)
                throw new ArgumentNullException("context");

            if (JsonRequestBehavior == JsonRequestBehavior.DenyGet && String.Equals(context.HttpContext.Request.HttpMethod, "GET", StringComparison.OrdinalIgnoreCase))
                throw new InvalidOperationException();

            if (ContentEncoding != null)
                context.HttpContext.Response.ContentEncoding = ContentEncoding;

            if (String.IsNullOrEmpty(ContentType))
                context.HttpContext.Response.ContentType = ContentType;
            else
                context.HttpContext.Response.ContentType = "application/json";

            if (Data != null)
            {
                var jsonSerializerSettings = new JsonSerializerSettings
                {
                    ContractResolver = new CamelCasePropertyNamesContractResolver()
                };
                context.HttpContext.Response.Write(JsonConvert.SerializeObject(Data, jsonSerializerSettings));
            }
        }
    }
}