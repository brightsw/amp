package com.bright.amp.account.service;

import org.springframework.stereotype.Service;

import com.bright.amp.account.dao.TaccountDao;
import com.bright.amp.account.model.Taccount;
import com.polydata.framework.core.service.BaseService;

@Service("accountService")
public class AccountService extends BaseService<Taccount,TaccountDao>{

	public void addAccount(Taccount account){
		String accdate = account.getAccdate();
		String date[] = accdate.split("-");
		String accmon = date[0]+"-"+date[1];
		account.setAccmon(accmon);
		account.setAccyear(date[0]);
		dao.insert(account);
	}

	public void updateAccount(Taccount account){
		String accdate = account.getAccdate();
		String date[] = accdate.split("-");
		String accmon = date[0]+"-"+date[1];
		account.setAccmon(accmon);
		account.setAccyear(date[0]);
		dao.update(account);
	}
	
	public void delete(Integer[] gids){
		for(Integer gid : gids){
			dao.delete(gid);
		}
	}
}
