import { Link } from "react-router-dom";
import { Col, Row, Container } from "react-bootstrap";

import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

import styles from './Footer.module.css'

function Footer() {
    return (
			<div className={styles.footerContainer}>
				<Container>
					<Row className='my-0'>
						<Col lg={4}>
							<img src='/images/logo-vbook.png' className='w-50 mb-2' alt='' />
							<div>
								<b>Địa chỉ: </b>Số 1 Đại Cồ Việt, phường Hai Bà Trưng, thành phố Hà Nội
							</div>
							<div>
								<b>Hotline: </b>(+84)913227645
							</div>
							<div>
								<b>Email: </b>support@vbookstore.com
							</div>
							<div>
								<Link to=''>
									<img src='/images/link/Facebook-on.png' alt='' />
								</Link>
								<Link to=''>
									<img src='/images/link/Insta-on.png' alt='' />
								</Link>
								<Link to=''>
									<img src='/images/link/Youtube-on.png' alt='' />
								</Link>
								<Link to=''>
									<img src='/images/link/twitter-on.png' alt='' />
								</Link>
								<Link to=''>
									<img src='/images/link/pinterest-on.png' alt='' />
								</Link>
							</div>
						</Col>
						<Col lg={5}>
							<h5>Đăng ký nhận tin</h5>
							<form className='input-group flex-nowrap mb-2'>
								<input
									className='form-control'
									type='text'
									placeholder='Nhập email của bạn?'
								/>
								<button className='btn btn-success'>
									<Icon icon={faPlay} />
								</button>
							</form>
							<div className='d-flex'>
								<div className='flex-fill'>
									<h5>Về chúng tôi</h5>
									<div>
										<Link to='' className='default-link fst-normal'>
											Giới thiệu về VBook
										</Link>
									</div>
									<div>
										<Link to='' className='default-link fst-normal'>
											Điều khoản sử dụng
										</Link>
									</div>
									<div>
										<Link to='' className='default-link fst-normal'>
											Chính sách bảo mật
										</Link>
									</div>
								</div>
								<div className='flex-fill'>
									<h5>Hỗ trợ khách hàng</h5>
									<div>
										<Link to='' className='default-link fst-normal'>
											Câu hỏi thường gặp
										</Link>
									</div>
									<div>
										<Link to='' className='default-link fst-normal'>
											Hướng dẫn mua hàng
										</Link>
									</div>
									<div>
										<Link to='' className='default-link fst-normal'>
											Chính sách đổi trả
										</Link>
									</div>
								</div>
							</div>
						</Col>
						<Col lg={3}>
							<h5>Địa chỉ liên hệ</h5>
							<div>
								<iframe
									src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.6915397936896!2d105.84129487517578!3d21.00499838063845!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135add3c46cb161%3A0x463734da30e16629!2zxJDhuqFpIGjhu41jIELDoWNoIGtob2EgSMOgIE7hu5lpIC0gSGFub2kgVW5pdmVyc2l0eSBvZiBTY2llbmNlIGFuZCBUZWNobm9sb2d5!5e0!3m2!1svi!2s!4v1689419174432!5m2!1svi!2s'
									className='w-100 border-3 rounded-3'
									allowFullScreen=''
									loading='lazy'
									referrerPolicy='no-referrer-when-downgrade'
								></iframe>
							</div>
						</Col>
					</Row>
					<div className='text-center border-top mt-2 pt-1 pb-2'>
						@ Design by Group 2
					</div>
				</Container>
			</div>
		);
}

export default Footer;