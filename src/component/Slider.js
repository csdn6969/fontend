const Slider = ()=>{
    return(
        <div className="banner">
  <div className="container">
    <div className="row">
      <div className="col-12">
        <div id="carouselExampleSlidesOnly" className="carousel slide" data-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src="images/banner1.jpg" className="d-block w-100 " alt="..." />
            </div>
            <div className="carousel-item">
              <img src="images/banner-2.jpg" className="d-block w-100 " alt="..." />
            </div>
            <div className="carousel-item">
              <img src="images/banner-3.jpg" className="d-block w-100" alt="..." />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
    )
}
export default Slider