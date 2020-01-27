using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore;
using Microsoft.Extensions.Hosting;
using Homeless.Controllers;
using System.IO;

namespace Homeless
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateFolder(AdvertsController.IMG_PATH);
            CreateFolder(AdvertsController.IMG_USER_PATH);
            CreateWebHostBuilder(args).Build().Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
            .UseUrls("https://192.168.43.20:5001")
            .UseStartup<Startup>();

        public static void CreateFolder(string path)
        {
            bool exists = Directory.Exists(path);
            if (!exists)
                Directory.CreateDirectory(path);
        }
    }
}