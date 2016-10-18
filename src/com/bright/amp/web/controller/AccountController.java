package com.bright.amp.web.controller;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.bright.amp.account.model.Taccount;
import com.bright.amp.account.model.TaccountType;
import com.bright.amp.account.model.Tincome;
import com.bright.amp.account.model.Tspend;
import com.bright.amp.account.service.AccountService;
import com.bright.amp.account.service.AccountTypeService;
import com.bright.amp.account.service.IncomeService;
import com.bright.amp.account.service.SpendService;
import com.bright.amp.core.log.LogType;
import com.bright.amp.core.log.LogUtil;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.LongSerializationPolicy;
import com.polydata.framework.core.web.Page;

@Controller
public class AccountController extends BaseController {

	/** logger */
	private static final LogUtil logger = new LogUtil(LoggerFactory.getLogger(AccountController.class));

	@Resource(name = "accountService")
	private AccountService accountService;

	@Resource(name = "accountTypeService")
	private AccountTypeService accountTypeService;

	@Resource(name = "incomeService")
	private IncomeService incomeService;

	@Resource(name = "spendService")
	private SpendService spendService;

	protected Gson createGson() {
		return new GsonBuilder().serializeNulls().setDateFormat("yyyy-MM-dd HH:mm:ss")
		        .setLongSerializationPolicy(LongSerializationPolicy.STRING).create();
	}

	/**
	 * AJAX请求列表数据
	 * 
	 * @param
	 * @return
	 */
	@RequestMapping(value = "/accountListJson", method = RequestMethod.POST)
	public void getJsonData(HttpServletResponse response, HttpServletRequest request, String sort,
	        Integer displayStart, Integer acctype, String accdateBegin, String accdateEnd, Integer moneyBegin,
	        Integer moneyEnd) {
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("sortColumns", sort);
			map.put("acctype", acctype);
			map.put("accdateBegin", accdateBegin);
			map.put("accdateEnd", accdateEnd);
			map.put("moneyBegin", moneyBegin);
			map.put("moneyEnd", moneyEnd);
			Page<Taccount> page = new Page<Taccount>();
			getPageParameter(page, request, displayStart);
			accountService.pageQuery(map, page);
			readerData2Json(page.getPageList(), page.getTotalCount(), response, page.getStart());
		} catch (Exception e) {
			e.printStackTrace();
			readerData2Json(null, 0, response, 0);
		}
	}

	/**
	 * AJAX提交新增数据
	 * 
	 * @param
	 * @return
	 */
	@RequestMapping(value = "/addAccount", method = RequestMethod.POST)
	public String add(@Valid Taccount account, BindingResult result, HttpServletResponse response,
	        HttpServletRequest request) {
		try {
			account.setRecuser(Integer.valueOf(this.getLoginUserId()));
			accountService.addAccount(account);
			logger.info("新增资金明细成功", LogType.OPERATOR);
			return this.renderText("success|success", response);
		} catch (Exception e) {
			e.printStackTrace();
			logger.info("新增资金明细错误", LogType.OPERATOR);
			return this.renderText("failure|新增资金明细错误", response);
		}
	}

	/**
	 * AJAX提交删除数据
	 * 
	 * @param
	 * @return
	 */
	@RequestMapping(value = "/removeAccount", method = RequestMethod.POST)
	public String remove(Integer[] gids, HttpServletResponse response, HttpServletRequest request) {
		try {
			accountService.delete(gids);
			logger.info("删除资金明细成功", LogType.OPERATOR);
			return this.renderText("success|success", response);
		} catch (Exception e) {
			e.printStackTrace();
			logger.info("删除资金明细失败", LogType.OPERATOR);
			return this.renderText("failure|删除资金明细成功", response);
		}
	}

	/**
	 * 详细信息页面
	 * 
	 * @param
	 * @return
	 */
	@RequestMapping(value = "/viewAccount", method = RequestMethod.GET)
	public void viewUser(String gid, HttpServletResponse response) {
		Taccount account = accountService.getById(gid);
		this.renderJson(account, response);
	}

	/**
	 * AJAX提交修改数据
	 * 
	 * @param
	 * @return
	 */
	@RequestMapping(value = "/modifyAccount", method = RequestMethod.POST)
	public String modify(@Valid Taccount account, BindingResult result, HttpServletResponse response,
	        HttpServletRequest request) {
		try {
			accountService.updateAccount(account);
			logger.info("修改资金明细成功", LogType.OPERATOR);
			return this.renderText("success|success", response);
		} catch (Exception e) {
			e.printStackTrace();
			logger.info("修改资金明细错误", LogType.OPERATOR);
			return this.renderText("failure|修改资金明细错误", response);
		}
	}

	/**
	 * AJAX请求列表数据
	 * 
	 * @param
	 * @return
	 */
	@RequestMapping(value = "/incomeListJson", method = RequestMethod.POST)
	public void incomeListJson(HttpServletResponse response, HttpServletRequest request, String sort,
	        Integer displayStart, Integer acctype, String accdateBegin, String accdateEnd, Integer moneyBegin,
	        Integer moneyEnd) {
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("sortColumns", sort);
			map.put("acctype", acctype);
			map.put("accdateBegin", accdateBegin);
			map.put("accdateEnd", accdateEnd);
			map.put("moneyBegin", moneyBegin);
			map.put("moneyEnd", moneyEnd);
			Page<Tincome> page = new Page<Tincome>();
			getPageParameter(page, request, displayStart);
			incomeService.pageQuery(map, page);
			readerData2Json(page.getPageList(), page.getTotalCount(), response, page.getStart());
		} catch (Exception e) {
			e.printStackTrace();
			readerData2Json(null, 0, response, 0);
		}
	}

	/**
	 * AJAX提交新增数据
	 * 
	 * @param
	 * @return
	 */
	@RequestMapping(value = "/addIncome", method = RequestMethod.POST)
	public String addIncome(@Valid Tincome income, BindingResult result, HttpServletResponse response,
	        HttpServletRequest request) {
		try {
			income.setRecuser(Integer.valueOf(this.getLoginUserId()));
			incomeService.addIncome(income);
			logger.info("新增收入明细成功", LogType.OPERATOR);
			return this.renderText("success|success", response);
		} catch (Exception e) {
			e.printStackTrace();
			logger.info("新增收入明细错误", LogType.OPERATOR);
			return this.renderText("failure|新增收入明细错误", response);
		}
	}

	/**
	 * AJAX提交删除数据
	 * 
	 * @param
	 * @return
	 */
	@RequestMapping(value = "/removeIncome", method = RequestMethod.POST)
	public String removeIncome(Integer[] gids, HttpServletResponse response, HttpServletRequest request) {
		try {
			incomeService.delete(gids);
			logger.info("删除收入明细成功", LogType.OPERATOR);
			return this.renderText("success|success", response);
		} catch (Exception e) {
			e.printStackTrace();
			logger.info("删除收入明细失败", LogType.OPERATOR);
			return this.renderText("failure|删除收入明细成功", response);
		}
	}

	/**
	 * 详细信息页面
	 * 
	 * @param
	 * @return
	 */
	@RequestMapping(value = "/viewIncome", method = RequestMethod.GET)
	public void viewIncome(String gid, HttpServletResponse response) {
		Tincome income = incomeService.getById(gid);
		this.renderJson(income, response);
	}

	/**
	 * AJAX提交修改数据
	 * 
	 * @param
	 * @return
	 */
	@RequestMapping(value = "/modifyIncome", method = RequestMethod.POST)
	public String modifyIncome(@Valid Tincome income, BindingResult result, HttpServletResponse response,
	        HttpServletRequest request) {
		try {
			incomeService.updateIncome(income);
			logger.info("修改收入明细成功", LogType.OPERATOR);
			return this.renderText("success|success", response);
		} catch (Exception e) {
			e.printStackTrace();
			logger.info("修改收入明细错误", LogType.OPERATOR);
			return this.renderText("failure|修改收入明细错误", response);
		}
	}

	/**
	 * AJAX请求列表数据
	 * 
	 * @param
	 * @return
	 */
	@RequestMapping(value = "/spendListJson", method = RequestMethod.POST)
	public void getSpenedJsonData(HttpServletResponse response, HttpServletRequest request, String sort,
	        Integer displayStart, Integer acctype, String accdateBegin, String accdateEnd, Integer moneyBegin,
	        Integer moneyEnd) {
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("sortColumns", sort);
			map.put("acctype", acctype);
			map.put("accdateBegin", accdateBegin);
			map.put("accdateEnd", accdateEnd);
			map.put("moneyBegin", moneyBegin);
			map.put("moneyEnd", moneyEnd);
			Page<Tspend> page = new Page<Tspend>();
			getPageParameter(page, request, displayStart);
			spendService.pageQuery(map, page);
			readerData2Json(page.getPageList(), page.getTotalCount(), response, page.getStart());
		} catch (Exception e) {
			e.printStackTrace();
			readerData2Json(null, 0, response, 0);
		}
	}

	/**
	 * AJAX提交新增数据
	 * 
	 * @param
	 * @return
	 */
	@RequestMapping(value = "/addSpend", method = RequestMethod.POST)
	public String add(@Valid Tspend spend, BindingResult result, HttpServletResponse response,
	        HttpServletRequest request) {
		try {
			spend.setRecuser(Integer.valueOf(this.getLoginUserId()));
			spendService.addSpend(spend);
			logger.info("新增支出明细成功", LogType.OPERATOR);
			return this.renderText("success|success", response);
		} catch (Exception e) {
			e.printStackTrace();
			logger.info("新增支出明细错误", LogType.OPERATOR);
			return this.renderText("failure|新增支出明细错误", response);
		}
	}

	/**
	 * AJAX提交删除数据
	 * 
	 * @param
	 * @return
	 */
	@RequestMapping(value = "/removeSpend", method = RequestMethod.POST)
	public String removeSpend(Integer[] gids, HttpServletResponse response, HttpServletRequest request) {
		try {
			spendService.delete(gids);
			logger.info("删除支出明细成功", LogType.OPERATOR);
			return this.renderText("success|success", response);
		} catch (Exception e) {
			e.printStackTrace();
			logger.info("删除支出明细失败", LogType.OPERATOR);
			return this.renderText("failure|删除支出明细成功", response);
		}
	}

	/**
	 * 详细信息页面
	 * 
	 * @param
	 * @return
	 */
	@RequestMapping(value = "/viewSpend", method = RequestMethod.GET)
	public void viewSpend(String gid, HttpServletResponse response) {
		Tspend spend = spendService.getById(gid);
		this.renderJson(spend, response);
	}

	/**
	 * AJAX提交修改数据
	 * 
	 * @param
	 * @return
	 */
	@RequestMapping(value = "/modifySpend", method = RequestMethod.POST)
	public String modify(@Valid Tspend spend, BindingResult result, HttpServletResponse response,
	        HttpServletRequest request) {
		try {
			spendService.updateSpend(spend);
			logger.info("修改支出明细成功", LogType.OPERATOR);
			return this.renderText("success|success", response);
		} catch (Exception e) {
			e.printStackTrace();
			logger.info("修改支出明细错误", LogType.OPERATOR);
			return this.renderText("failure|修改支出明细错误", response);
		}
	}

	/**
	 * AJAX请求列表数据
	 * 
	 * @param
	 * @return
	 */
	@RequestMapping(value = "/accountTypeListJson", method = RequestMethod.POST)
	public void getTypeJsonData(HttpServletResponse response, HttpServletRequest request, String sort,
	        Integer displayStart) {
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("sortColumns", sort);
			Page<TaccountType> page = new Page<TaccountType>();
			getPageParameter(page, request, displayStart);
			accountTypeService.pageQuery(map, page);
			readerData2Json(page.getPageList(), page.getTotalCount(), response, page.getStart());
		} catch (Exception e) {
			e.printStackTrace();
			readerData2Json(null, 0, response, 0);
		}
	}

	/**
	 * AJAX提交新增数据
	 * 
	 * @param
	 * @return
	 */
	@RequestMapping(value = "/addAccountType", method = RequestMethod.POST)
	public String add(@Valid TaccountType accounttype, BindingResult result, HttpServletResponse response,
	        HttpServletRequest request) {
		try {
			accountTypeService.addAccountType(accounttype);
			logger.info("新增账目类型成功", LogType.OPERATOR);
			return this.renderText("success|success", response);
		} catch (Exception e) {
			e.printStackTrace();
			logger.info("新增账目类型错误", LogType.OPERATOR);
			return this.renderText("failure|新增账目类型错误", response);
		}
	}

	/**
	 * AJAX提交删除数据
	 * 
	 * @param
	 * @return
	 */
	@RequestMapping(value = "/removeAccountType", method = RequestMethod.POST)
	public String removetype(Integer[] typeids, HttpServletResponse response, HttpServletRequest request) {
		try {
			accountTypeService.delete(typeids);
			logger.info("删除账目类型成功", LogType.OPERATOR);
			return this.renderText("success|success", response);
		} catch (Exception e) {
			e.printStackTrace();
			logger.info("删除账目类型失败", LogType.OPERATOR);
			return this.renderText("failure|删除账目类型成功", response);
		}
	}

	/**
	 * 跳转列表页面
	 * 
	 * @param
	 * @return
	 */
	@RequestMapping(value = "/getAccountTypes", method = RequestMethod.GET)
	public void getAccountTypes(Integer capitaluse, Integer incomeuse, Integer spenduse, HttpServletResponse response)
	        throws Exception {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("capitaluse", capitaluse);
		map.put("incomeuse", incomeuse);
		map.put("spenduse", spenduse);
		this.renderJson(accountTypeService.query(map), response);
	}

}
