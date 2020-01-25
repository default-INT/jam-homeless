using Microsoft.EntityFrameworkCore.Migrations;

namespace Homeless.Migrations
{
    public partial class AdversChanged : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AnimalType",
                table: "Adverts",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "Adverts",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AnimalType",
                table: "Adverts");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "Adverts");
        }
    }
}
