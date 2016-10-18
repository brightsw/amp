package com.bright.amp.account.service;

import org.springframework.stereotype.Service;

import com.bright.amp.account.dao.TincomeDao;
import com.bright.amp.account.model.Tincome;
import com.polydata.framework.core.service.BaseService;

@Service("incomeService")
public class IncomeService extends BaseService<Tincome,TincomeDao>{
	
	public void addIncome(Tincome income){
		String accdate = income.getAccdate();
		String date[] = accdate.split("-");
		String accmon = date[0]+"-"+date[1];
		income.setAccmon(accmon);
		income.setAccyear(date[0]);
		dao.insert(income);
	}

	public void updateIncome(Tincome income){
		String accdate = income.getAccdate();
		String date[] = accdate.split("-");
		String accmon = date[0]+"-"+date[1];
		income.setAccmon(accmon);
		income.setAccyear(date[0]);
		dao.update(income);
	}
	
	public void delete(Integer[] gids){
		for(Integer gid : gids){
			dao.delete(gid);
		}
	}
}
